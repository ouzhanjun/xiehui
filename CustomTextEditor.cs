using System;
using System.Drawing;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Linq;

public class CustomTextEditor : Control
{
    // IME相关的Win32 API
    [DllImport("imm32.dll")]
    private static extern IntPtr ImmGetContext(IntPtr hWnd);

    [DllImport("imm32.dll")]
    private static extern bool ImmReleaseContext(IntPtr hWnd, IntPtr hIMC);

    [DllImport("imm32.dll")]
    private static extern bool ImmSetCompositionWindow(IntPtr hIMC, ref COMPOSITIONFORM lpCompForm);

    // 输入法组合窗口位置结构
    [StructLayout(LayoutKind.Sequential)]
    private struct COMPOSITIONFORM
    {
        public int dwStyle;
        public POINT ptCurrentPos;
        public RECT rcArea;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct POINT
    {
        public int x;
        public int y;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct RECT
    {
        public int left;
        public int top;
        public int right;
        public int bottom;
    }

    // 文本存储和光标位置
    private StringBuilder textContent;
    private int caretPosition;
    private bool isCaretVisible;
    private Timer caretTimer;

    // 文本选择相关
    private int selectionStart;
    private int selectionLength;
    private bool isSelecting;
    private Point mouseDownPos;

    // 滚动相关
    private VScrollBar vScrollBar;
    private HScrollBar hScrollBar;
    private int firstVisibleLine;
    private float lineHeight;
    private int maxLineWidth;

    // 样式相关
    private List<TextStyle> textStyles;
    private Color selectionColor = Color.LightBlue;
    
    // 属性
    public int SelectionStart 
    { 
        get => selectionStart;
        set
        {
            selectionStart = Math.Max(0, Math.Min(value, textContent.Length));
            Invalidate();
        }
    }

    public int SelectionLength
    {
        get => selectionLength;
        set
        {
            selectionLength = Math.Max(0, Math.Min(value, textContent.Length - selectionStart));
            Invalidate();
        }
    }

    public string SelectedText
    {
        get
        {
            if (selectionLength == 0) return string.Empty;
            return textContent.ToString(selectionStart, selectionLength);
        }
        set
        {
            if (value == null) value = string.Empty;
            ReplaceSelection(value);
        }
    }

    // 文本样式类
    private class TextStyle
    {
        public int Start { get; set; }
        public int Length { get; set; }
        public Font Font { get; set; }
        public Color ForeColor { get; set; }
        public Color BackColor { get; set; }
    }

    // 构造函数
    public CustomTextEditor()
    {
        SetStyle(ControlStyles.AllPaintingInWmPaint |
                ControlStyles.UserPaint |
                ControlStyles.OptimizedDoubleBuffer |
                ControlStyles.ResizeRedraw, true);

        textContent = new StringBuilder();
        caretPosition = 0;
        
        // 初始化光标闪烁定时器
        caretTimer = new Timer();
        caretTimer.Interval = 500; // 500ms闪烁间隔
        caretTimer.Tick += CaretTimer_Tick;
        caretTimer.Start();

        // 设置控件属性
        BackColor = Color.White;
        Font = new Font("Microsoft YaHei", 12f);

        // 初始化新增字段
        selectionStart = 0;
        selectionLength = 0;
        isSelecting = false;
        textStyles = new List<TextStyle>();
        
        // 初始化滚动条
        InitializeScrollBars();

        // 添加复制粘贴快捷键支持
        this.KeyDown += CustomTextEditor_KeyDown;
    }

    // 初始化滚动条
    private void InitializeScrollBars()
    {
        vScrollBar = new VScrollBar
        {
            Dock = DockStyle.Right,
            Visible = false
        };
        hScrollBar = new HScrollBar
        {
            Dock = DockStyle.Bottom,
            Visible = false
        };

        vScrollBar.Scroll += ScrollBar_Scroll;
        hScrollBar.Scroll += ScrollBar_Scroll;

        Controls.Add(vScrollBar);
        Controls.Add(hScrollBar);
    }

    // 处理滚动事件
    private void ScrollBar_Scroll(object sender, ScrollEventArgs e)
    {
        if (sender == vScrollBar)
        {
            firstVisibleLine = e.NewValue;
        }
        Invalidate();
    }

    // 处理键盘快捷键
    private void CustomTextEditor_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Control)
        {
            switch (e.KeyCode)
            {
                case Keys.C:
                    Copy();
                    e.Handled = true;
                    break;
                case Keys.V:
                    Paste();
                    e.Handled = true;
                    break;
                case Keys.X:
                    Cut();
                    e.Handled = true;
                    break;
                case Keys.A:
                    SelectAll();
                    e.Handled = true;
                    break;
            }
        }
    }

    // 复制粘贴功能
    public void Copy()
    {
        if (selectionLength > 0)
        {
            Clipboard.SetText(SelectedText);
        }
    }

    public void Cut()
    {
        if (selectionLength > 0)
        {
            Copy();
            ReplaceSelection(string.Empty);
        }
    }

    public void Paste()
    {
        if (Clipboard.ContainsText())
        {
            ReplaceSelection(Clipboard.GetText());
        }
    }

    public void SelectAll()
    {
        selectionStart = 0;
        selectionLength = textContent.Length;
        Invalidate();
    }

    // 替换选中文本
    private void ReplaceSelection(string newText)
    {
        if (selectionLength > 0)
        {
            textContent.Remove(selectionStart, selectionLength);
        }
        textContent.Insert(selectionStart, newText);
        caretPosition = selectionStart + newText.Length;
        selectionLength = 0;
        UpdateScrollBars();
        Invalidate();
    }

    // 更新滚动条
    private void UpdateScrollBars()
    {
        using (Graphics g = CreateGraphics())
        {
            // 计算内容大小
            string[] lines = textContent.ToString().Split('\n');
            int totalLines = lines.Length;
            lineHeight = Font.GetHeight(g);
            maxLineWidth = 0;

            foreach (string line in lines)
            {
                SizeF size = g.MeasureString(line, Font);
                maxLineWidth = Math.Max(maxLineWidth, (int)size.Width);
            }

            // 更新垂直滚动条
            int visibleLines = (int)(ClientSize.Height / lineHeight);
            vScrollBar.Maximum = Math.Max(0, totalLines - visibleLines + 1);
            vScrollBar.Visible = totalLines > visibleLines;

            // 更新水平滚动条
            hScrollBar.Maximum = Math.Max(0, maxLineWidth - ClientSize.Width + 1);
            hScrollBar.Visible = maxLineWidth > ClientSize.Width;
        }
    }

    // 光标闪烁
    private void CaretTimer_Tick(object sender, EventArgs e)
    {
        if (Focused)
        {
            isCaretVisible = !isCaretVisible;
            Invalidate();
        }
    }

    // 重写绘制方法
    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        Graphics g = e.Graphics;

        // 计算可见区域
        int visibleLines = (int)(ClientSize.Height / lineHeight);
        string[] lines = textContent.ToString().Split('\n');

        // 绘制选中区域
        if (selectionLength > 0)
        {
            string beforeSelection = textContent.ToString().Substring(0, selectionStart);
            string selection = textContent.ToString().Substring(selectionStart, selectionLength);
            SizeF beforeSize = g.MeasureString(beforeSelection, Font);
            SizeF selectionSize = g.MeasureString(selection, Font);

            g.FillRectangle(new SolidBrush(selectionColor),
                beforeSize.Width,
                beforeSize.Height - lineHeight,
                selectionSize.Width,
                lineHeight);
        }

        // 绘制文本和样式
        float y = 0;
        for (int i = firstVisibleLine; i < Math.Min(lines.Length, firstVisibleLine + visibleLines); i++)
        {
            string line = lines[i];
            float x = -hScrollBar.Value;

            // 应用文本样式
            foreach (var style in textStyles)
            {
                if (IsStyleInLine(style, i, lines))
                {
                    // 绘制带样式的文本段
                    DrawStyledText(g, style, line, x, y);
                }
            }

            // 绘制普通文本
            g.DrawString(line, Font, Brushes.Black, x, y);
            y += lineHeight;
        }

        // 绘制光标
        if (Focused && isCaretVisible)
        {
            DrawCaret(g);
        }
    }

    // 判断样式是否在当前行
    private bool IsStyleInLine(TextStyle style, int lineIndex, string[] lines)
    {
        int lineStart = 0;
        for (int i = 0; i < lineIndex; i++)
        {
            lineStart += lines[i].Length + 1; // +1 for newline
        }
        int lineEnd = lineStart + lines[lineIndex].Length;

        return style.Start < lineEnd && (style.Start + style.Length) > lineStart;
    }

    // 绘制带样式的文本
    private void DrawStyledText(Graphics g, TextStyle style, string line, float x, float y)
    {
        // 实现样式文本的绘制
        if (style.BackColor != Color.Transparent)
        {
            SizeF size = g.MeasureString(line, style.Font ?? Font);
            g.FillRectangle(new SolidBrush(style.BackColor), x, y, size.Width, size.Height);
        }
        g.DrawString(line, style.Font ?? Font, new SolidBrush(style.ForeColor), x, y);
    }

    // 绘制光标
    private void DrawCaret(Graphics g)
    {
        string textBeforeCaret = textContent.ToString().Substring(0, caretPosition);
        SizeF caretPos = g.MeasureString(textBeforeCaret, Font);
        g.DrawLine(Pens.Black,
            caretPos.Width - hScrollBar.Value,
            caretPos.Height - lineHeight + (firstVisibleLine * lineHeight),
            caretPos.Width - hScrollBar.Value,
            caretPos.Height + (firstVisibleLine * lineHeight));
    }

    // 添加文本样式
    public void AddStyle(int start, int length, Font font = null, Color? foreColor = null, Color? backColor = null)
    {
        textStyles.Add(new TextStyle
        {
            Start = start,
            Length = length,
            Font = font,
            ForeColor = foreColor ?? Color.Black,
            BackColor = backColor ?? Color.Transparent
        });
        Invalidate();
    }

    // 清除所有样式
    public void ClearStyles()
    {
        textStyles.Clear();
        Invalidate();
    }

    // 处理键盘输入
    protected override void OnKeyPress(KeyPressEventArgs e)
    {
        base.OnKeyPress(e);

        if (char.IsControl(e.KeyChar))
        {
            // 处理控制字符
            switch (e.KeyChar)
            {
                case (char)Keys.Back:
                    if (caretPosition > 0)
                    {
                        textContent.Remove(caretPosition - 1, 1);
                        caretPosition--;
                        Invalidate();
                    }
                    break;
            }
        }
        else
        {
            // 插入普通字符
            textContent.Insert(caretPosition, e.KeyChar);
            caretPosition++;
            Invalidate();
        }
    }

    // 处理输入法消息
    protected override void WndProc(ref Message m)
    {
        const int WM_IME_COMPOSITION = 0x010F;
        const int GCS_RESULTSTR = 0x0800;

        switch (m.Msg)
        {
            case WM_IME_COMPOSITION:
                if ((m.LParam.ToInt32() & GCS_RESULTSTR) != 0)
                {
                    IntPtr hIMC = ImmGetContext(Handle);
                    if (hIMC != IntPtr.Zero)
                    {
                        try
                        {
                            // 获取输入法组合字符串
                            int strLen = ImmGetCompositionString(hIMC, GCS_RESULTSTR, null, 0);
                            if (strLen > 0)
                            {
                                byte[] buffer = new byte[strLen];
                                ImmGetCompositionString(hIMC, GCS_RESULTSTR, buffer, strLen);
                                string imeString = Encoding.Unicode.GetString(buffer);

                                // 插入输入法文本
                                textContent.Insert(caretPosition, imeString);
                                caretPosition += imeString.Length;
                                Invalidate();
                            }
                        }
                        finally
                        {
                            ImmReleaseContext(Handle, hIMC);
                        }
                    }
                    return;
                }
                break;
        }

        base.WndProc(ref m);
    }

    // 处理鼠标点击
    protected override void OnMouseDown(MouseEventArgs e)
    {
        base.OnMouseDown(e);
        Focus();

        // 计算点击位置对应的文本位置
        Graphics g = CreateGraphics();
        int clickPosition = 0;
        float totalWidth = 0;

        for (int i = 0; i < textContent.Length; i++)
        {
            float charWidth = g.MeasureString(textContent[i].ToString(), Font).Width;
            if (e.X < totalWidth + charWidth / 2)
            {
                clickPosition = i;
                break;
            }
            totalWidth += charWidth;
            clickPosition = i + 1;
        }

        caretPosition = clickPosition;
        isCaretVisible = true;
        Invalidate();
        g.Dispose();
    }

    // 更新输入法窗口位置
    private void UpdateImeWindowPosition()
    {
        if (!Focused) return;

        IntPtr hIMC = ImmGetContext(Handle);
        if (hIMC != IntPtr.Zero)
        {
            try
            {
                Graphics g = CreateGraphics();
                string textBeforeCaret = textContent.ToString().Substring(0, caretPosition);
                SizeF caretPos = g.MeasureString(textBeforeCaret, Font);
                g.Dispose();

                COMPOSITIONFORM cf = new COMPOSITIONFORM();
                cf.dwStyle = 0x0020; // CFS_POINT
                cf.ptCurrentPos = new POINT 
                { 
                    x = (int)caretPos.Width, 
                    y = (int)caretPos.Height 
                };

                ImmSetCompositionWindow(hIMC, ref cf);
            }
            finally
            {
                ImmReleaseContext(Handle, hIMC);
            }
        }
    }

    // 清理资源
    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            caretTimer?.Dispose();
        }
        base.Dispose(disposing);
    }
} 
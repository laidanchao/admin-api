import sharp from 'sharp';

class ImgUtils {
  /**
   * 添加文字水印到图片右下角
   * @param imageBuffer 图片缓冲区
   * @param text 水印文字
   * @param options 配置选项
   */
  async addTextWatermark(
    imageBuffer: Buffer,
    text: string,
    options: {
      fontSize?: number;
      color?: string;
      opacity?: number;
      margin?: number;
    } = {},
  ): Promise<Buffer> {
    const {
      fontSize = 50,
      color = 'white',
      opacity = 0.7,
      margin = 20,
    } = options;

    // 获取图片元数据
    const metadata = await sharp(imageBuffer).metadata();
    const { width: imageWidth, height: imageHeight } = metadata;

    // 创建水印 SVG
    const svgWatermark = this.createWatermarkSvg(
      text,
      fontSize,
      color,
      opacity,
      imageWidth,
      imageHeight,
      margin,
    );

    // 添加水印
    return sharp(imageBuffer)
      .composite([
        {
          input: Buffer.from(svgWatermark),
          top: 0,
          left: 0,
        },
      ])
      .png() // 输出为 PNG 格式，保持质量
      .toBuffer();
  }

  /**
   * 创建水印 SVG
   */
  private createWatermarkSvg(
    text: string,
    fontSize: number,
    color: string,
    opacity: number,
    imageWidth: number,
    imageHeight: number,
    margin: number,
  ): string {
    // 计算水印位置（右下角）
    const x = imageWidth - margin;
    const y = imageHeight - margin;
    const fontFamily = 'Arial, Helvetica, sans-serif';

    return `
      <svg width="${imageWidth}" height="${imageHeight}">
        <text 
          x="${x}" 
          y="${y}" 
          font-family="${fontFamily}" 
          font-size="${fontSize}" 
          fill="${color}" 
          fill-opacity="${opacity}" 
          text-anchor="end"
          dy="0.35em"
        >
          ${this.escapeSvgText(text)}
        </text>
      </svg>
    `;
  }

  /**
   * 转义 SVG 文本
   */
  private escapeSvgText(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

export default new ImgUtils();

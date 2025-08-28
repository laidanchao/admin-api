import XLSX from 'xlsx';

class ExcelUtils {
  /**
   * 读取excel数据
   * @param path
   */
  getJsonData(buffer: Buffer) {
    const workbook = XLSX.read(buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  /**
   * 读取excel数据
   * @param path
   */
  getJsonDataByPath(path: string) {
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  }

  /**
   * 生成excel
   * @param jsonData
   * @param savePath
   */
  createExcel(jsonData: any, savePath: string) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');
    XLSX.writeFile(newWorkbook, savePath);
  }
}

export default new ExcelUtils();

export class Config {

    public static get baseUserURL(): string { return "https://localhost:44305"; }
    public static get baseWarehouseURL(): string { return "https://localhost:44392"; }


    public static get tableInformation(): Object {
        return {
            processing: "Đang xử lý",
            search: "Tìm kiếm",
            lengthMenu: "Hiển thị _MENU_ kết quả",
            info: "Hiển thị kết quả _START_ tới _END_ trong tổng số _TOTAL_ kết quả",
            infoEmpty: "Hiển thị kết quả 0 tới 0 trong tổng số 0 kết quả",
            paginate: {
              first: "Premier",
              previous: "Lùi",
              next: "Tới",
              last: "Cuối"
            }
          }
    }
}
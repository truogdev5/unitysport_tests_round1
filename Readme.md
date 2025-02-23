# 🚀 Thuật toán Two Sum

## 📌 **Brute Force (Duyệt từng cặp phần tử)**  
- **Độ phức tạp**: `O(n²)`.  
- **Ưu điểm**:  
  - Dễ hiểu, không cần bộ nhớ bổ sung.  
- **Nhược điểm**:  
  - Chạy chậm khi dữ liệu lớn do phải duyệt qua tất cả các cặp phần tử.  

---

## 📌 **HashMap (Dùng cấu trúc dữ liệu để tối ưu)**  
- **Độ phức tạp**: `O(n)`.  
- **Ưu điểm**:  
  - Giảm đáng kể thời gian thực thi bằng cách lưu trữ giá trị đã duyệt vào HashMap.  
  - Mỗi phần tử chỉ cần duyệt một lần.  
- **Nhược điểm**:  
  - Tốn thêm bộ nhớ `O(n)` để lưu trữ HashMap.  

| Thuật toán    | Độ phức tạp | Bộ nhớ | Ưu điểm | Nhược điểm |
|--------------|------------|--------|---------|-----------|
| **Brute Force** | `O(n²)` | `O(1)` | Đơn giản | Chậm |
| **HashMap** | `O(n)` | `O(n)` | Nhanh hơn | Tốn bộ nhớ |

---

# 🚀 2. Thuật toán Kiểm tra Chuỗi Đối Xứng (Palindrome)

## 📌 **Two Pointer (Dùng hai con trỏ)**  
- **Độ phức tạp**: `O(n)`, chỉ cần kiểm tra một nửa chuỗi.  
- **Ưu điểm**:  
  - Tiết kiệm bộ nhớ (`O(1)`) do không dùng stack đệ quy.  
  - Thực thi nhanh vì chỉ cần lặp `n/2` lần.  
- **Nhược điểm**:  
  - Cần sử dụng vòng lặp để kiểm tra từng cặp ký tự.  

---

## 📌 **Recursion (Đệ quy)**  
- **Độ phức tạp**: `O(n)`, nhưng tốn bộ nhớ **O(n)** do stack đệ quy.  
- **Ưu điểm**:  
  - Viết gọn, dễ đọc, phù hợp với tư duy đệ quy.  
- **Nhược điểm**:  
  - Tốc độ chậm hơn Two Pointer do chi phí gọi hàm đệ quy.  
  - Dễ gây **stack overflow** khi xử lý chuỗi rất dài.  

| Phương pháp | Độ phức tạp | Bộ nhớ | Ưu điểm | Nhược điểm |
|------------|------------|--------|---------|-----------|
| **Two Pointer** | `O(n)` | `O(1)` | Nhanh, tiết kiệm RAM | Cần vòng lặp |
| **Recursion** | `O(n)` | `O(n)` | Viết gọn | Tốn bộ nhớ |

---

# 🚀 3. Nén Dữ Liệu JSON bằng Indexed Encoding

## 🔹 1. Mục tiêu
Mục tiêu của thuật toán là **giảm dung lượng file JSON** bằng cách thay thế **tên trường dài bằng tên ngắn** và **dùng Indexed Encoding** để lưu chỉ mục thay vì giá trị gốc.

---

## 🔹 2. Quá trình Nén  

### 📌 **Bước 1: Rút gọn tên trường dài bằng Key Mapping**  
Thay vì lưu trữ các tên trường dài như `"season_id"`, `"competition_id"`, ta thay bằng các ký hiệu ngắn như `"si"`, `"ci"`.

Ví dụ:
```json
{
   "season_id": "s123",
   "competition_id": "c456",
   "status_id": 1
}
```
➡ Sau khi rút gọn:
```json
{
   "si": "s123",
   "ci": "c456",
   "sid": 1
}
```

---

### 📌 **Bước 2: Indexed Encoding (Lưu chỉ mục thay vì giá trị gốc)**  
Thay vì lưu trữ giá trị trùng lặp nhiều lần, ta tạo bảng giá trị **duy nhất (`uniques`)** và lưu chỉ mục của chúng trong dữ liệu.

#### 🟢 **Dữ liệu trước khi nén:**  
```json
[
   { "id": "A123", "status": "active" },
   { "id": "B456", "status": "inactive" },
   { "id": "A123", "status": "active" }
]
```

#### 🔵 **Dữ liệu sau khi Indexed Encoding:**  
```json
{
   "uniques": {
      "i": ["A123", "B456"],
      "s": ["active", "inactive"]
   },
   "data": {
      "i": [0, 1, 0],
      "s": [0, 1, 0]
   }
}
```
- **Giải thích**:
  - `"uniques"` lưu danh sách giá trị **duy nhất**.
  - `"data"` chỉ lưu **chỉ mục** của từng giá trị thay vì lưu cả chuỗi.

---

## 🔹 3. Kết quả sau khi nén  
✅ **Dung lượng file giảm đáng kể**.  
✅ **Tăng tốc độ đọc ghi dữ liệu**.  
✅ **Dễ dàng khôi phục về dữ liệu gốc**.  

---





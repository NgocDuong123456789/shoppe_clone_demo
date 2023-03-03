những thứ cần cài khi setup 1 dự án
--ESLint : linter(bộ kiểm tra lỗi ) chính
--Prettier: code formater chính
--@typescript-eslint/eslint-plugin: ESLint plugin cung các các module cho typescript
--@typescript-eslint/parser: parser cho phép eslint kiểm tra lỗi typescript
--eslint-config-prettier: bộ config eslint để vô hiêu hóa các eslint mà xung đột với prettier
-- eslint-plugin-import: để eslint hiểu về cú pháp `import ` trong source code
-- eslint-plugin-jsx-ally: kiểm tra các vấn đề liên quan tới accessiblity(tính thân thiện của website)
--eslint-plugin-react:các rule eslint cho react
-- eslint-plugin-prettier: dùng thêm 1 số rule prettier cho eslint

chạy câu lệnh
npm add eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-react eslint-plugin-prettier -D
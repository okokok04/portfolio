import * as React from 'react';

/**
 * Ảnh dùng trong site. `src` là đường dẫn tĩnh trong `public/` hoặc URL
 * media.base44.com; khi là URL media của Base44 thì ảnh được tối ưu tự động,
 * còn lại sẽ render thành thẻ <img> bình thường.
 *
 * File khai báo này chỉ dùng lúc biên dịch: nó cho `tsc` biết props của
 * component `image.jsx` (viết bằng JS, không có type) nên các trang dùng
 * <Image src alt className /> không bị báo lỗi TS2322. Runtime vẫn dùng
 * image.jsx — Vite không resolve file .d.ts.
 */
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  /** Cách ảnh lấp đầy khung: cắt (`fill`) hay thu vừa (`fit`). */
  fittingType?: 'fill' | 'fit';
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
  quality?: number;
}

export declare const Image: React.ForwardRefExoticComponent<
  ImageProps & React.RefAttributes<HTMLImageElement>
>;

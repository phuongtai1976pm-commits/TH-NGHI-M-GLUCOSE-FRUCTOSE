import React from 'react';
import { X, HelpCircle, Beaker, Flame, Droplet, Sparkles, CheckCircle } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-800">Hướng Dẫn Sử Dụng Phòng Thí Nghiệm Ảo</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 text-xs text-slate-600 leading-relaxed no-scrollbar">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center space-x-1.5">
              <Beaker className="w-4 h-4 text-indigo-600" />
              <span>1. Chọn Thí Nghiệm Mẫu SGK 12</span>
            </h4>
            <p>Nhấp vào danh sách 5 Thí nghiệm mẫu ở cột trái (ví dụ: Tác dụng Cu(OH)₂, Tráng bạc Tollens, Phân biệt bằng nước Bromine, Lên men rượu). Hệ thống sẽ tự động tải các bước hướng dẫn chuẩn.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center space-x-1.5">
              <Droplet className="w-4 h-4 text-amber-600" />
              <span>2. Thao Tác Thêm Hóa Chất</span>
            </h4>
            <p>Nhấp vào các lọ hóa chất có viền sáng nhấp nháy (như NaOH, CuSO₄, Glucose, AgNO₃, NH₃, Bromine) để thêm dung dịch vào ống nghiệm theo đúng thứ tự SGK.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center space-x-1.5">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>3. Đun Nóng & Ngâm Cốc Nước Nóng</span>
            </h4>
            <p>Sử dụng các nút thao tác phía dưới ống nghiệm: Bật Đèn Cồn để đun nóng Cu(OH)₂ tạo kết tủa Cu₂O đỏ gạch, hoặc Ngâm Cốc Nước Nóng 65°C để tráng gương bạc Ag.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-indigo-900 mb-1 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>4. Quan Sát Hiện Tượng & Xem Phương Trình</span>
            </h4>
            <p>Cột bên phải hiển thị chi tiết hiện tượng màu sắc, giải thích bản chất nhóm chức (Aldehyde/Polyol), phương trình hóa học và lưu ý ôn thi THPT Quốc Gia.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-lg transition cursor-pointer"
          >
            Đã Hiểu & Bắt Đầu
          </button>
        </div>

      </div>
    </div>
  );
};


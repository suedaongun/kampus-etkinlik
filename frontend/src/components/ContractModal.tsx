import React from "react";

interface ContractModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onAccept, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Etkinlik Oluşturma Şartları</h2>
        <div className="modal-body">
          <p>Lütfen devam etmeden önce kuralları onaylayın:</p>
          <ul>
            <li>Girilen etkinlik bilgileri doğru ve eksiksizdir.</li>
            <li>Kampüs kurallarına aykırı etkinlik oluşturulamaz.</li>
          </ul>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            İptal
          </button>
          <button className="btn-primary" onClick={onAccept}>
            Kabul Ediyorum
          </button>
        </div>
      </div>
    </div>
  );
};
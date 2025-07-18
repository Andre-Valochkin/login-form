import { Modal } from "antd";

import ModalForm from "./modal-form/ModalForm";

const MainModal = ({ isOpen, onClose }) => {
	return (
		<Modal
			open={isOpen}
			onCancel={onClose}
			footer={null}
			closable={false}
			destroyOnHidden
		>
			<ModalForm onLoginSuccess={onClose} />
		</Modal>
	);
}

export default MainModal;
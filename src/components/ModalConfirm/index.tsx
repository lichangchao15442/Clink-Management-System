import { ReactNode } from 'react'
import { Modal } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale'

interface ModalConfirmProps {
    title: string;
    content: ReactNode;
    onOk: () => void;
}
const ModalConfirm = ({ title, content, onOk }: ModalConfirmProps) => (
    Modal.confirm({
        title,
        content,
        okText: formatMessage({ id: 'commonandfields.confirm' }),
        cancelText: formatMessage({ id: 'commonandfields.cancel' }),
        onOk
    })
)

export default ModalConfirm
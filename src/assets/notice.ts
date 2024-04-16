import { ElNotification } from 'element-plus'

export default function notice(type: string, title: string, message: string) {
  ElNotification({
    type,
    title,
    message,
  })
}
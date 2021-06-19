import { Alert } from 'antd'
import React from 'react'

interface AlertBarProps {
  error: string
}

export const AlertBar: React.FC<AlertBarProps> = ({ error }) => {
  return <Alert message={error} type='error' style={{ marginBottom: '20px' }} />
}

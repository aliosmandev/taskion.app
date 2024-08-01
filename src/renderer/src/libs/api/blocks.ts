import { AddTodoBlock, BlockResult, UpdateBlock } from '../types/api/blocks'
import { ApiResponse } from '../types/api/instance'
import instance from './instance'

export const getBlocks = async (pageId: string) => {
  const response = await instance.get<ApiResponse<BlockResult[]>>(`/blocks/${pageId}`)
  return response.data
}

export const createTodoBlock = async (pageId: string, block: AddTodoBlock) => {
  const response = await instance.post<ApiResponse<BlockResult>>(`/blocks/create/${pageId}`, block)
  return response.data
}

export const updateBlock = async (blockId: string, block: UpdateBlock) => {
  const response = await instance.put<ApiResponse<BlockResult>>(`/blocks/update/${blockId}`, block)
  return response.data
}

export const deleteBlock = async (blockId: string) => {
  const response = await instance.delete<ApiResponse<BlockResult>>(`/blocks/delete/${blockId}`)
  return response.data
}

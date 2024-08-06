export interface ApiResponse<T> {
  has_more: boolean;
  next_cursor: any;
  object: string;
  request_id: string;
  results: T;
  type: string;
}

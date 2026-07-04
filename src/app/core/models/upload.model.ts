export interface PhotoUploadResponse {
  photo_path: string;
  photo_url: string;
}

export interface UploadProgressUpdate {
  kind: 'progress';
  progress: number;
}

export interface UploadCompleteUpdate {
  kind: 'complete';
  response: PhotoUploadResponse;
}

export type PhotoUploadUpdate = UploadProgressUpdate | UploadCompleteUpdate;

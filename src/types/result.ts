type FailedResult = [null, string];
type SuccessResult<T> = [T, null];

export type Result<T> = FailedResult | SuccessResult<T>;

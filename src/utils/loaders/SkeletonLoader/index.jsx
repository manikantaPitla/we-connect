import Skeleton from "react-loading-skeleton";
import {
  LoadingWrapper,
  ReceivedConnectionsSkeletonWrapper,
  SentConnectionsSkeletonWrapper,
  SkeletonWrapper,
} from "./style";

export function SearchUserLoader() {
  return (
    <LoadingWrapper>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonWrapper key={index}>
          <Skeleton circle width={50} height={50} />
          <div>
            <Skeleton width={100} />
            <Skeleton width={150} />
          </div>
        </SkeletonWrapper>
      ))}
    </LoadingWrapper>
  );
}

export function ReceivedConnectionsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <ReceivedConnectionsSkeletonWrapper key={index}>
          <Skeleton height={50} width={50} circle />
          <p>
            <Skeleton />
          </p>
          <Skeleton height={30} width={60} />
          <Skeleton height={30} width={60} />
        </ReceivedConnectionsSkeletonWrapper>
      ))}
    </>
  );
}
export function SentConnectionsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <SentConnectionsSkeletonWrapper key={index}>
          <Skeleton height={50} width={50} circle />
          <p>
            <Skeleton />
          </p>
          <Skeleton height={30} width={60} />
        </SentConnectionsSkeletonWrapper>
      ))}
    </>
  );
}

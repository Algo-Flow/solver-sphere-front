import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 문제의 타입 정의
interface ProblemDetail {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  rating: number;
  submissionCode: string;
}

// 예시로 사용된 완료한 문제 데이터
const mockCompletedProblems: ProblemDetail[] = [
  {
    id: 1,
    title: "최단거리 문제",
    description: "이 문제는 그래프에서 최단거리를 구하는 문제입니다.",
    author: "작성자 A",
    date: "2023-10-01",
    rating: 4.8,
    submissionCode: "def shortest_path(graph): return graph",
  },
  {
    id: 2,
    title: "다익스트라 알고리즘",
    description: "이 문제는 다익스트라 알고리즘을 구현하는 문제입니다.",
    author: "작성자 B",
    date: "2023-10-02",
    rating: 4.9,
    submissionCode: "def dijkstra(graph): return graph",
  },
  {
    id: 3,
    title: "DFS와 BFS",
    description: "이 문제는 DFS와 BFS 알고리즘을 구현하는 문제입니다.",
    author: "작성자 C",
    date: "2023-10-03",
    rating: 4.7,
    submissionCode: "def dfs_bfs(graph): return graph",
  },
];

const CompletedProblemDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [problemDetail, setProblemDetail] = useState<ProblemDetail | null>(
    null
  );

  useEffect(() => {
    if (id) {
      // Mock 데이터에서 문제를 찾는다
      const problem = mockCompletedProblems.find(
        (p) => p.id === parseInt(id as string)
      );
      setProblemDetail(problem || null);
    }
  }, [id]);

  if (!problemDetail) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          {problemDetail.title}
        </h1>
        <p className="text-gray-600 mb-4">{problemDetail.description}</p>
        <p className="text-gray-600 mb-2">작성자: {problemDetail.author}</p>
        <p className="text-gray-600 mb-2">완료 날짜: {problemDetail.date}</p>
        <p className="text-gray-600 mb-4">평점: {problemDetail.rating} ⭐</p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          내가 제출한 코드
        </h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">
          {problemDetail.submissionCode}
        </pre>
      </div>
    </div>
  );
};

export default CompletedProblemDetail;

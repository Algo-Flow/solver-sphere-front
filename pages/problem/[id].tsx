// path: pages/problem/[id].tsx

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import ChatComponent from "../../components/ChatComponent";
import Image from "next/image";

// 문제 상세 정보를 위한 타입 정의
interface ProblemDetail {
  id: string | string[];
  title: string;
  description: string;
  author: string;
  views: number;
  upvote: number;
  date: string;
  imageUrl: string;
}

const ProblemDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [problemDetail, setProblemDetail] = useState<ProblemDetail | null>(null);
  const [isUpvoted, setIsUpvoted] = useState(false); // 추천 여부 확인
  const [userCode, setUserCode] = useState(""); // 사용자가 작성하는 코드를 저장하는 상태

  // 문제 세부 정보를 가져오는 함수
  const fetchProblemDetail = useCallback(() => {
    const mockProblem: ProblemDetail = {
      id: id || "",
      title: "최단거리 문제",
      description: `이 문제는 그래프에서 최단거리를 구하는 문제입니다.
        여러 줄의 설명을 이렇게 사용할 수 있습니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.`,
      author: "작성자 A",
      views: 100,
      upvote: 10,
      date: "2023-10-01",
      imageUrl: "/images/problem1.png",
    };
    setProblemDetail(mockProblem);
  }, [id]);

  // 조회수 증가 처리
  const handleViewIncrement = useCallback(() => {
    setProblemDetail((prev) => prev ? { ...prev, views: prev.views + 1 } : null);
  }, []);

  // 추천수 증가 처리
  const handleUpvote = () => {
    if (!problemDetail || isUpvoted) return;
    setProblemDetail((prev) => prev ? { ...prev, upvote: prev.upvote + 1 } : null);
    setIsUpvoted(true);
  };

  // 코드 제출 처리
  const handleSubmitCode = () => {
    if (!userCode) return alert("코드를 작성해 주세요!");
    alert("코드가 제출되었습니다!");
  };

  useEffect(() => {
    if (id) {
      fetchProblemDetail();
      handleViewIncrement();
    }
  }, [id, fetchProblemDetail, handleViewIncrement]);

  if (!problemDetail) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto p-6 flex flex-grow">
        {/* 왼쪽: 문제 내용 */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg mr-4 flex-grow">
          <h1 className="text-3xl font-bold text-indigo-600">{problemDetail.title}</h1>
          {problemDetail.imageUrl && (
            <Image
              src={problemDetail.imageUrl}
              alt={problemDetail.title}
              width={500}
              height={300}
              className="mt-6 w-full h-auto rounded"
            />
          )}
          <p className="text-gray-600 mt-4 mb-35 whitespace-pre-line">
            {problemDetail.description}
          </p>

          <div className='px-30 py-30 h-48 flex flex-col items-end'>
            <p className="text-gray-500 mt-2">작성자: {problemDetail.author}</p>
            <p className="text-gray-500">조회수: {problemDetail.views}</p>
            <div className="flex items-center mt-2">
              <p className="text-gray-500">추천수: {problemDetail.upvote}</p>
              <FaStar
                className={`ml-2 cursor-pointer ${isUpvoted ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={handleUpvote}
              />
            </div>
            <p className="text-gray-500">날짜: {problemDetail.date}</p>
          </div>
        </div>

        {/* 오른쪽: 코드 제출 및 채팅 영역 */}
        <div className="w-1/2 flex flex-col space-y-6">
          {/* 코드 제출란 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">코드 제출</h2>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="여기에 코드를 작성하세요"
              className="w-full h-64 p-4 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSubmitCode}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              제출
            </button>
          </div>

          {/* 채팅 영역 */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">참가중인 채팅</h2>
            <ChatComponent workspaceId={String(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;

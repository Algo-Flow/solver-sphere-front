import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; // 별 모양을 위한 아이콘

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
  const [userCode, setUserCode] = useState(''); // 사용자가 작성하는 코드를 저장하는 상태

  // 문제 세부 정보를 가져오는 함수
  const fetchProblemDetail = async () => {
    // 실제 API를 사용하면 이 부분을 활성화하여 백엔드로부터 데이터를 받아올 수 있다.
    /*
    const response = await fetch(`/api/problem/${id}`);
    const data = await response.json();
    setProblemDetail(data);
    */

    // 임의 데이터
    const mockProblem: ProblemDetail = {
      id: id || '',  
      title: '최단거리 문제',
      description: `이 문제는 그래프에서 최단거리를 구하는 문제입니다.
        여러 줄의 설명을 이렇게 사용할 수 있습니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.
        각 줄은 개행문자로 분리되어 여러 줄로 표시됩니다.`,
      author: '작성자 A',
      views: 100,
      upvote: 10,
      date: '2023-10-01',
      imageUrl: '/images/problem1.png',
    };
    setProblemDetail(mockProblem);
  };

  // 조회수 증가 처리
  const handleViewIncrement = async () => {
    if (!problemDetail) return;

    // 조회수 증가 처리
    setProblemDetail(prev => prev ? { ...prev, views: prev.views + 1 } : null);

    // 실제 API 호출로 조회수를 업데이트하는 부분 (주석 처리)
    /*
    await fetch(`/api/problem/${id}/increment-views`, { method: 'POST' });
    */
  };

  // 추천수 증가 처리
  const handleUpvote = async () => {
    if (!problemDetail || isUpvoted) return; // 이미 추천한 경우 중복 불가

    // 추천수 증가 처리
    setProblemDetail(prev => prev ? { ...prev, upvote: prev.upvote + 1 } : null);
    setIsUpvoted(true); // 이미 추천했음을 표시

    // 실제 API 호출로 추천수를 업데이트하는 부분 (주석 처리)
    /*
    await fetch(`/api/problem/${id}/upvote`, { method: 'POST' });
    */
  };

  // 코드 제출 처리
  const handleSubmitCode = async () => {
    if (!userCode) return alert("코드를 작성해 주세요!");

    // 백엔드로 코드 전송 (임의 API)
    const payload = {
      problemId: problemDetail?.id,
      code: userCode,
      language: 'Python', // 언어는 고정된 상태지만 선택할 수 있음
    };

    console.log('제출된 코드:', payload);

    // 실제 백엔드로 코드 전송하는 부분
    /*
    const response = await fetch('/api/submit-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);
    */
    alert("코드가 제출되었습니다!");
  };

  useEffect(() => {
    if (id) {
      fetchProblemDetail(); // 문제 데이터 가져오기
      handleViewIncrement(); // 페이지에 접속할 때 조회수 증가
    }
  }, [id]);

  if (!problemDetail) return <div>로딩 중...</div>; // 데이터가 로드되지 않았을 때 로딩 표시

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 flex">
        {/* 왼쪽: 문제 내용 */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg mr-4">
          <h1 className="text-3xl font-bold text-indigo-600">{problemDetail.title}</h1>
          {problemDetail.imageUrl && (
            <img
              src={problemDetail.imageUrl}
              alt={problemDetail.title}
              className="mt-6 w-full h-auto rounded"
            />
          )}
          
           {/* description과 작성자 사이의 간격 */}
          <p className="text-gray-600 mt-4 mb-35 whitespace-pre-line flex justify-center"style={{ marginBottom: '35px' }}>{problemDetail.description}</p>
          {/* Tailwind의 기본 간격을 사용: Tailwind에서 제공하는 기본적인 마진 값을 사용해야 한다. 예를 들어, mb-8, mb-16, mb-40 같은 값을 사용하는 것이 좋다. */}
          
          <div className='px-30 py-30 h-48 flex flex-col items-end'>

          <p className="text-gray-500 mt-2">작성자: {problemDetail.author}</p>
          <p className="text-gray-500">조회수: {problemDetail.views}</p>
          <div className="flex items-center mt-2">
            <p className="text-gray-500">추천수: {problemDetail.upvote}</p>
            <FaStar
              className={`ml-2 cursor-pointer ${isUpvoted ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={handleUpvote} // 클릭 시 추천 증가
            />
          </div>
          <p className="text-gray-500">날짜: {problemDetail.date}</p>




          </div>
          
          
        </div>

        {/* 오른쪽: 코드 작성 및 실행 영역 */}
        <div className="w-1/2 bg-gray-200 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">코드 작성</h2>
            <select className="border-2 border-gray-400 p-2 rounded-lg">
              <option>Python</option>
              <option>JavaScript</option>
              <option>C++</option>
              {/* 필요한 언어 추가 */}
            </select>
          </div>
          <textarea
            className="w-full h-64 p-4 border-2 border-gray-400 rounded-lg"
            placeholder="여기에 코드를 작성하세요."
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)} // 코드 입력값을 상태에 저장
          ></textarea>
          <button
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            onClick={handleSubmitCode} // 제출 버튼 클릭 시 코드 제출
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;

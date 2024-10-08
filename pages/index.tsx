// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용****


/*문제 목록은 /api/board/lists로 가져오고, 문제 세부 정보는 /api/board/post/{postId}*/


// 문제 데이터를 나타내는 타입 정의
interface Problem {
  id: number;
  title: string;
  author: string;
  rating: number;
  date: string;
}



const HomePage = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리


  const router = useRouter(); // useRouter 훅 사용****


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 토글
  };


  // 문제 작성 페이지로 이동하는 함수
  const handleCreateProblem = () => {
    router.push('/header-page/create-problem'); // /create-problem 페이지로 이동
  };

  // 로그인 페이지로 이동하는 함수
  const handleLogin = () => {
    router.push('/header-page/login'); // /login 페이지로 이동
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignup = () => {
    router.push('/header-page/signup'); // /signup 페이지로 이동
  };







  // 문제 목록을 저장하는 상태 (타입 지정)
  const [problemList, setProblemList] = useState<Problem[]>([]);

  // 백엔드 API를 호출하는 함수 (백엔드 완성 전에는 주석 처리)
  const fetchProblems = async () => {
    /*
    // API 호출 (백엔드 개발이 완료되면 주석 해제)
    const response = await fetch('/api/board/lists');
    const data = await response.json();
    setProblemList(data.posts);
    */

    // 임시 데이터로 문제 목록을 설정 (나중에 API로 대체 가능)
    const mockData: Problem[] = [
      { id: 1, title: '최단거리 문제', author: '작성자 A', rating: 4.8, date: '2023-10-01' },
      { id: 2, title: '다익스트라 알고리즘', author: '작성자 B', rating: 4.9, date: '2023-10-02' },
      { id: 3, title: 'DFS와 BFS', author: '작성자 C', rating: 4.7, date: '2023-10-03' },
      { id: 4, title: '최대공약수와 최소공배수', author: '작성자 D', rating: 4.5, date: '2023-10-04' },
      { id: 5, title: '동적 계획법', author: '작성자 E', rating: 4.6, date: '2023-10-05' },
      { id: 6, title: '이진 탐색', author: '작성자 F', rating: 4.8, date: '2023-10-06' },
      { id: 7, title: '백트래킹 문제', author: '작성자 G', rating: 4.9, date: '2023-10-07' },
      { id: 8, title: '우선순위 큐', author: '작성자 H', rating: 4.8, date: '2023-10-08' },
      { id: 9, title: '그리디 알고리즘', author: '작성자 I', rating: 4.7, date: '2023-10-09' },
      { id: 10, title: '플로이드-워셜 알고리즘', author: '작성자 J', rating: 4.6, date: '2023-10-10' },
      { id: 11, title: '크루스칼 알고리즘', author: '작성자 K', rating: 4.9, date: '2023-10-11' },
      { id: 12, title: '벨만-포드 알고리즘', author: '작성자 L', rating: 4.5, date: '2023-10-12' },
      { id: 13, title: '동전 교환 문제', author: '작성자 M', rating: 4.8, date: '2023-10-13' },
      { id: 14, title: '재귀 함수와 분할 정복', author: '작성자 N', rating: 4.9, date: '2023-10-14' },
      { id: 15, title: '에라토스테네스의 체', author: '작성자 O', rating: 4.7, date: '2023-10-15' },
      { id: 16, title: '프림 알고리즘', author: '작성자 P', rating: 4.6, date: '2023-10-16' },
      { id: 17, title: '동적 계획법', author: '작성자 Q', rating: 4.9, date: '2023-10-17' },
      { id: 18, title: '트리와 그래프 탐색', author: '작성자 R', rating: 4.7, date: '2023-10-18' },
      { id: 19, title: '해시 알고리즘', author: '작성자 S', rating: 4.8, date: '2023-10-19' },
      { id: 20, title: '문자열 처리 알고리즘', author: '작성자 T', rating: 4.9, date: '2023-10-20' },
    ];

    setProblemList(mockData); // 문제 목록 상태 업데이트
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* 헤더 */}
      <header className="bg-white shadow-lg p-5 flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-3 rounded-full" />
          <h1 className="text-2xl font-bold text-indigo-600">Solver Sphere</h1>
        </div>

        <div className="flex items-center space-x-4" style={{ width: '512px' }} >
          <input
            type="text"
            placeholder="문제 또는 작성자 검색"
            className="w-full border-2 border-indigo-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all">
            🔍
          </button>
        </div>

        <div className="relative flex items-center space-x-4">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-all"
            onClick={handleCreateProblem} // 문제 작성 페이지로 이동
          >
            문제 작성하기
          </button>

          {/* 아이콘 및 드롭다운 */}
          <div className="relative">
            <div
              className="bg-indigo-100 p-2 rounded-full border-2 border-indigo-300 text-indigo-600 cursor-pointer"
              onClick={toggleDropdown} // 아이콘 클릭 시 드롭다운 열림/닫힘
            >
              👤
            </div>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 transition-all"
                  onClick={handleLogin} // 로그인 페이지로 이동
                >
                  로그인하기
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 transition-all"
                  onClick={handleSignup} // 회원가입 페이지로 이동
                >
                  회원가입하기
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex">
        {/* 문제 카드 리스트 */}
        <main className="flex-1 grid grid-cols-3 gap-8 p-6">
          {problemList.map((problem) => (
            <Link href={`/problem/${problem.id}`} key={problem.id}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105">
                {/* 이미지 섹션 */}
                <div className="w-full h-48 bg-gray-200">
                  <img 
                    src={`/images/problem${problem.id}.png`} 
                    alt={`문제 ${problem.id}`} 
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* 문제 정보 섹션 */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-700">{problem.title}</h2>
                  </div>
                  <p className="text-gray-500">작성자: {problem.author}</p>
                  <p className="text-gray-500">날짜: {problem.date}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">⭐ {problem.rating}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>
        {/* 사이드바 */}
        <aside className="w-1/5 bg-white p-6 shadow-lg rounded-2xl">
          <div className="flex flex-col space-y-6">
            <Link href="/right-side-bar/completed">
              <span className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer">
                완료한 문제
              </span>
            </Link>
            <Link href="/right-side-bar/in-progress">
              <span className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer">
                풀고 있는 문제
              </span>
            </Link>
            <Link href="/right-side-bar/chat">
              <span className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer">
                참가중인 채팅
              </span>
            </Link>
            <Link href="/right-side-bar/my-problems">
              <span className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer">
                내가 작성한 문제
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;

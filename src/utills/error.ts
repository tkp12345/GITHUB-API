export const errorHandler = () => {
  const delay = 3000;
  alert('예상치못한 오류가 발생했습니다 3초우 페이지를 새로고침합니다');
  setTimeout(() => {
    location.reload();
  }, delay);
};

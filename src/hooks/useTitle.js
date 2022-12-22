import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Motor Mechanic`;
  }, [title]);
};

export default useTitle;

//

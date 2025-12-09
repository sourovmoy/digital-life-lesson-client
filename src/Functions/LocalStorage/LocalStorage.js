const getLessons = () => {
  const getLessonString = localStorage.getItem("lessons");
  if (getLessonString) {
    const parseGetLessons = JSON.parse(getLessonString);
    return parseGetLessons;
  }
  return [];
};

const setItemString = (lessons) => {
  const lessonsString = JSON.stringify(lessons);
  localStorage.setItem("lessons", lessonsString);
};

const addLessons = (state) => {
  const getAllLessons = getLessons();
  const alreadyExists = getAllLessons.some((item) => item === state);

  if (alreadyExists) {
    return;
  } else {
    getAllLessons.push(state);
    setItemString(getAllLessons);
    return;
  }
};
const removeLessons = (id) => {
  const lessons = getLessons();
  const filterLesson = lessons.filter((lessonsId) => lessonsId !== id);
  setItemString(filterLesson);
};

export { getLessons, addLessons, removeLessons };

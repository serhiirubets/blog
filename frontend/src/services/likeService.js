if (!localStorage.getItem('like')) {
  localStorage.setItem('like', JSON.stringify({}));
}
export const checkForLike = (id) => {
  const like = JSON.parse(localStorage.getItem('like'));
  return like && like[id] && like[id].like;
};

export const checkForDislike = (id) => {
  const like = JSON.parse(localStorage.getItem('like'));
  return like[id] && like[id].dislike;
};

const removeLike = (id) => {
  const like = JSON.parse(localStorage.getItem('like'));
  like[id].like = null;
  localStorage.setItem('like', JSON.stringify(like));
}

const removeDislike = (id) => {
  const like = JSON.parse(localStorage.getItem('like'));
  like[id].dislike = null;
  localStorage.setItem('like', JSON.stringify(like));
}


export const setLike = (id) => {
  if (!checkForLike(id)) {
    const like = JSON.parse(localStorage.getItem('like'));
    if (like[id]) {
      like[id].like = true;
    } else {
      like[id] = { like: true}
    }

    localStorage.setItem('like', JSON.stringify(like));
  }

  if (checkForDislike(id)) {
    removeDislike(id);
  }
}

export const setDislike = (id) => {
  if (!checkForDislike(id)) {
    const like = JSON.parse(localStorage.getItem('like'));
    if (like[id]) {
      like[id].dislike = true;
    } else {
      like[id] = { like: false}
    }
    
    localStorage.setItem('like', JSON.stringify(like));
  }

  if (checkForLike(id)) {
    removeLike(id);
  }
}


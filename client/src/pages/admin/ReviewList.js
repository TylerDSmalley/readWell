import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewList() {

  const [listOfReviews, setlistOfReviews] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/admin/reviews/list").then((response) => {
      setlistOfReviews(response.data);
    });
  }, []);

  const deleteReview = (id) => {
    axios.delete(`http://localhost:3001/admin/reviews/delete/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <div>
      <h5>List of Book Reviews</h5>
      {listOfReviews.map((value, key) => {
        return (
        <div key={key} className="card m-2">
          <div className="card-body">
          <p className="card-title"><b>Review:</b>&nbsp;{value.summary}</p>
          <button type="button" className="btn btn-primary" onClick={()=>{deleteReview(value.id)}}>Delete</button>
          </div>
          </div>
        );
      })}
    </div>
  )
}

export default ReviewList

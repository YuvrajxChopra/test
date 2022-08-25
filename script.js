addques();
document.getElementById("newquestions").addEventListener("click", () => {
  document.getElementById("submit-div").style.display = "revert";
  document.getElementById("resolve-div").style.display = "none";
  document.getElementById("resolve-form").style.display = "none";
  document.getElementById("resolve-form").style.display = "none";
});

if (document.getElementById("ques") != null) {
  document.getElementById("ques").addEventListener("click", () => {
    document.getElementById("resolve-div").style.display = "revert";
    document.getElementById("submit-div").style.display = "none";
  });
}
document.getElementById("resolve-btn").addEventListener("click", () => {
  document.getElementById("resolve-form").style.display = "revert";
});

function sub() {
  if (document.getElementById("question-title").value.trim() == "") {
    document.getElementById("error").style.display = "revert";
    return;
  }
  document.getElementById("error").style.display = "none";
  var titleinput = document.getElementById("question-title").value;
  var descinput = document.getElementById("description-input").value;
  var valueofdata = [
    {
      title: titleinput,
      description: descinput,
      responses: [],
    },
  ];
  var newvalueofdata = {
    title: titleinput,
    description: descinput,
    responses: [],
  };
  document.getElementById("error").style.display = "none";
  /*if (localStorage.getItem(titleinput) == descinput) {
    document.getElementById("error").innerHTML = "Title already exist !";
    return;
  }*/
  if (localStorage.getItem("Questions") == null)
    localStorage.setItem("Questions", JSON.stringify(valueofdata));
  else {
    let newobj = JSON.parse(localStorage.getItem("Questions"));
    newobj.push(newvalueofdata);
    console.log(newobj);
    localStorage.setItem("Questions", JSON.stringify(newobj));
  }

  addques();
}

function addques() {
  var elems = document.querySelectorAll(".ques");

  [].forEach.call(elems, function (el) {
    el.remove();
  });
  if (JSON.parse(localStorage.getItem("Questions")) == null) return;
  let lenoflocal = JSON.parse(localStorage.getItem("Questions")).length;
  for (let i = 0; i < lenoflocal; i++) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const ptag = document.createElement("p");
    div.classList.add("ques");
    h3.classList.add("ques-title");
    ptag.classList.add("ques-desc");

    div.appendChild(h3);
    div.appendChild(ptag);
    let ele = JSON.parse(localStorage.getItem("Questions"));
    h3.innerHTML = ele[i].title;
    ptag.innerHTML = ele[i].description;
    div.addEventListener("click", function () {
      document.getElementById("resolve-form").style.display = "none";
      document.getElementById("resolve-div").style.display = "revert";
      document.getElementById("submit-div").style.display = "none";

      document.getElementById("qd-title").innerHTML = h3.innerHTML;
      document.getElementById("qd-desc").innerHTML = ele[i].description;

      var elems2 = document.querySelectorAll(".ques-resolve");

      [].forEach.call(elems2, function (el) {
        el.remove();
      });
      if (ele[i].responses.length == 0) return;
      for (let j = 0; j < ele[i].responses.length; j++) {
        const div1 = document.createElement("div");
        const h4 = document.createElement("h4");
        const ptag1 = document.createElement("p");
        div1.classList.add("ques-resolve");
        div1.appendChild(h4);
        div1.appendChild(ptag1);
        h4.innerHTML = ele[i].responses[j].name;
        ptag1.innerHTML = ele[i].responses[j].solution;
        document.getElementById("response-div").appendChild(div1);
      }
    });
    document.getElementById("questions").appendChild(div);
  }
}

function showhide(e) {
  console.log(e);
  document.getElementById("resolve-div").style.display = "revert";
  document.getElementById("submit-div").style.display = "none";

  let key = e.innerHTML;
  document.getElementById("qd-title").innerHTML = key;
}

document.getElementById("postans").addEventListener("click", addresolve);
function addresolve() {
  var key = document.getElementById("qd-title").innerHTML;
  var keyvalue = document.getElementById("qd-desc").innerHTML;
  var inputname = document.getElementById("entername").value;
  var inputsol = document.getElementById("entersol").value;
  let ele = localStorage.getItem("Questions");
  const newresponse = {
    name: inputname,
    solution: inputsol,
  };
  let temp = JSON.parse(localStorage.getItem("Questions"));
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].title == key) {
      let newobj = temp;
      newobj[i].responses.push(newresponse);
      localStorage.setItem("Questions", JSON.stringify(newobj));
      var elems = document.querySelectorAll(".ques-resolve");

      [].forEach.call(elems, function (el) {
        el.remove();
      });
      for (let j = 0; j < temp[i].responses.length; j++) {
        const div1 = document.createElement("div");
        const h4 = document.createElement("h4");
        const ptag1 = document.createElement("p");
        div1.classList.add("ques-resolve");
        div1.appendChild(h4);
        div1.appendChild(ptag1);
        h4.innerHTML = temp[i].responses[j].name;
        ptag1.innerHTML = temp[i].responses[j].solution;
        document.getElementById("response-div").appendChild(div1);
      }
    }
  }
}

document.getElementById("searchbar").addEventListener("input", () => {
  var input = document.getElementById("searchbar").value;
  var elems = document.querySelectorAll(".ques");

  [].forEach.call(elems, function (el) {
    el.remove();
  });
  if (JSON.parse(localStorage.getItem("Questions")) == null) return;
  let lenoflocal = JSON.parse(localStorage.getItem("Questions")).length;
  for (let i = 0; i < lenoflocal; i++) {
    let ele = JSON.parse(localStorage.getItem("Questions"));
    if (ele[i].title.toLowerCase().includes(input.toLowerCase())) {
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const ptag = document.createElement("p");
      div.classList.add("ques");
      h3.classList.add("ques-title");
      ptag.classList.add("ques-desc");

      div.appendChild(h3);
      div.appendChild(ptag);

      h3.innerHTML = ele[i].title;
      ptag.innerHTML = ele[i].description;

      document.getElementById("questions").appendChild(div);
      
    div.addEventListener("click", function () {
      document.getElementById("resolve-div").style.display = "revert";
      document.getElementById("submit-div").style.display = "none";

      document.getElementById("qd-title").innerHTML = h3.innerHTML;
      document.getElementById("qd-desc").innerHTML = ele[i].description;

      var elems2 = document.querySelectorAll(".ques-resolve");

      [].forEach.call(elems2, function (el) {
        el.remove();
      });
      if (ele[i].responses.length == 0) return;
      for (let j = 0; j < ele[i].responses.length; j++) {
        const div1 = document.createElement("div");
        const h4 = document.createElement("h4");
        const ptag1 = document.createElement("p");
        div1.classList.add("ques-resolve");
        div1.appendChild(h4);
        div1.appendChild(ptag1);
        h4.innerHTML = ele[i].responses[j].name;
        ptag1.innerHTML = ele[i].responses[j].solution;
        document.getElementById("response-div").appendChild(div1);
      }
    });
    }
  }
});

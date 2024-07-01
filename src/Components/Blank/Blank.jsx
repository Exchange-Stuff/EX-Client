export const Blank = () => {
  window.onload = async function () {
    const queryString = window.location.search;
    var url = "http://localhost:5059/api/Auth/signin" + queryString;
    var request = new Request(url, {
      method: "GET",
    });
    var rs = await fetch(request);
    console.log(rs);
    if (rs.ok) {
      var txt = await rs.text();
      var pTxt = JSON.parse(txt);
      localStorage.setItem("accessToken", pTxt.value.accessToken);
      localStorage.setItem("refreshToken", pTxt.value.refreshToken);
      window.location.href = "http://localhost:3000/HomePage";
    } else {
      window.location.href = "http://localhost:3000/HomePage";
    }
  };
};

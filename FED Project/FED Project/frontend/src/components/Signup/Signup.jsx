import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./signup.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    day: "",
    username: "",
    year: "",
    month: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.account);
  const registerUser = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const index = months.indexOf(userDetails.month);
    let DOB = `${index}-${userDetails.day}-${userDetails.year}`;
    const { email, password, gender, username } = userDetails;
    let d = JSON.stringify({
      email,
      password,
      gender,
      DOB,
      username,
    });
    console.log(d);
    const res = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: d,
    });

    const data = await res.json();
    if (data.success) {
      setUserDetails({
        email: "",
        day: "",
        username: "",
        year: "",
        month: "",
        password: "",
        gender: "",
      });
      toast.success(data.message);
      navigate("/");
      localStorage.setItem("token", JSON.stringify(data.token));
    } else {
      toast.error(data.message);
    }
    console.log(data);
  };

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    if (e.target.name === "gender") {
      if (e.target.id === "m") {
        setUserDetails({ ...userDetails, gender: "M" });
      }
      if (e.target.id === "f") {
        setUserDetails({ ...userDetails, gender: "F" });
      }
      if (e.target.id === "o") {
        setUserDetails({ ...userDetails, gender: "O" });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="py-8 bg-white">
        <div className="logo text-center">
          <Link to="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaMA
            AAB4CAMAAABoxW2eAAAAqFBMVEX///8ezLAUFBQAAAAAyasHBwcRERHb29u+
            vr7Hx8fLy8u2tradnZ1RUVENDQ3i4uKurq7V1dVXV1fz8/P4/v3u7u75+flh
            YWHu+/mFhYXPz88ZGRmkpKS6urqXl5ff398kJCSu6t+R49R6enpra2s60bjQ8+
            1s2sZDQ0OKiopR1b4sLCwzMzPG7+eL4dGd5dhwcHDf9/Nh2cS67eQ7Ozt93csx
            MTFHR0egyuUgAAARWklEQVR4nO1d6WKiOhRWQdTWohZBrda6drSt2jq1ff83u4
            QlOVkJiPbOTL5fLYYA+ThrTkKlkhf94W5+OB1f1lWE9cvxdJjvhv3c/RhcBsPd/
            ri2Q1QhogMv+93wp2/P4HmxZtlhmFovnn/6Jv9lPO/XCn4IT+v9x0/f6r+J/lyH
            IEzT3Bina2O4qOoSlNBUXRjTdE0MT9oiBFk6GZauhf6+AEMRS/bCaLyrYJ5Ty9G
            yNP/p2/8H8PFSnKGIpRfj410Yh/MYilg6/PRD/NUYnilEqSgZ3+Fi2JVAUERS1a
            QeLoRFGUKUsGT03UXwqzyKQpJOP/04fyH6pZgiQNKLCZVKxnBdLkWGpNIxLJmgi
            KS1ce9KxHB9AY5CkowklYb+RSgy6q5MlOwuQJJ++tH+FpTqdDMkGRe8FBQKXbka
            FFk7E8yWgF0hKZp/zE9VHZpskxY6G8NCFMV25uOgY8mMB34uXopQVMW+wEfmrLp
            9/MnH+xtQNI9KesisfTAm6Tx8FHXpoAL7OGb0YmZmz0HR4NWmh32nLIEw2u4czJ
            VDqxh4+zfdUV8ZY7GtDfTRV8rKrvIhH3XOxijproqungfB43bU9c/t5U/EXiEoU
            dJaWoFi77nOnhUU2Yuz7jNYWhFGZ/XyR0IRGiXzCnJB+yXoTjUFdVaQtLGcGoJ1
            f04vfyRO0jHFswpSDSZKliqmcgVyp4+uVUtgbYv34jeaj48PT08dPzjjXq4MhRj
            h2TmpIK2FXcrdRFt7lqIzbaeYNqIjA8yR+1nwWb3ppm4lqH3db1sF+7k2FNaIaC
            apIAm7lE9E6VukG4vgNjoyc1OOHKuQ39AZWVbdwZ24iK73P4Emua2h0qD55EIhm
            7qCdIOlplYSR1uLdEn6tr4bBfq6LqQSYlNl9RLXTqa7nqW96sZIPEdE19W/8z/n
            g2M5PEWoM2uSv7frQqaWmKyApBrFljlq0gSg7pQszxHwGaa5H/PWcoUMFezuqpC
            /8Mzoi82WLc3BSbnXzNrxHFWWqe899vI+ZlciRMkF2nn7uypkHoPNLiASmxj51J
            0sTaub/hZwVJnGLsQqtzV6UFIU2rdO3h6vCKkHxqskYSpOMb0qC7vE7joHEUcV7
            7ZQLih4dSEhMSBr1iB3n9eDTNXZO72mCo5k9ZSayk7IUUG0SV+uVVtNb2963fc6
            tFBW78xLXBCyTJzIsoumalVlChI1qqnsyuSohtmwXh/T9EJwO6uTSyzPvMQFIVF
            1AjESe+kqjmRBkt40UokcNYjTfgeP+2MQcZ13iQtCNoxCm9HPyZGsYM/WurX8HH
            mNXq8jSsLdEqf9kfoB6EDrSXCi/9TrNYRdUq0aqJXWLWYjvCLTlaxgS/yqn3JyJ
            DF2emVcPEc+zuBN2REJetO7NA236rK/bglHdOYnAPmmJvWL39oOxvi3u+2NkKjO
            7egON3IHbZKxmJBkI2XpuvjwE/dfxW9/xl29jh7IKdJIU5gNEIy50gGQOI16Bon
            nqEEGlB5qb/pFEnHIbRvQvy9lclRpYPRgyNV5d6Dj59TDYdtyMVnr3qLyf+F/my
            6+JMY7OAW8FMg7/cb/hfcVbN3Ui3HDnjDfRwlFVfsoSiDwY6520gSCh6BlkEQci
            cVhazE5hHC0NlCWRuRErenBpcWHU+Gw3VCN/DtBq7r1FUcGD/iSlKVrpodjZ/8u
            dVpCKe7R3eEMlWKhhC0SJd4LlOaCIkhUqVaEpMtR51OQKa1Z0IZNc5k271vUIWI
            JvhmNuriVNYtJIgNugZwtflusSOAIR60Gm6tyEpKUxamCOno+d6CeD5KZO53ZWE
            2OGla9JoID8jtNCxze3GYkkoScx+eS6LkjTf9Zm6gBkF2QaEpj6aQrwtFkxvXnx
            DGbNFkXjz+/vwIfIqk4mss8e50oVo+jjitNlVpd3AiOet2qD0Ytea5iBQhFE0ww
            0MVz9B4IraK8BWzVpm8f+Pv4RpLEPebIGQseI9aHv7NKH1kPjA+RpM/aP0hrvoT
            RVzGO3ujhhzodJOHoEYgGdTN9ELpqQOaQP9devoHxx9mIJTA348G0vZqRVu4YdR
            xgwXBq+IXo0qqOcFSLb9uhDVykJTN3nGEzq5xylJoW1Y5QWo6dFkdbQFE4pMvlA
            Mzjkde+zakvJCL11S0vTmTYrGVi/kGWIslGBICiSUR10AStIjf+XfBGYRlNtOYd
            1NNu4sKDJ0JlG4sMivi5bdYRlLhoO+XydK3KEx2OOkBsrPfouYMpsNZplBF8iYy
            Wg2h6YC4rcAEbuEfHjY+0SKsm3yr2tlt8T8E4aZKqP8iR9XobhOiOyTH3tSL1jR
            UkMcrOFtRuZe/ZpbWqT4ejEWiD5+lAVgFns58kJj6k6W0CfQgQg5HDxC9MfLQJi
            W7JqVhw3FkkWpgz9y1p0cNiNOE4wglD7xUkqDxFeCR96RnPTigR2WswhMzm5ygA
            IgNK7oBLhXVZT1TLEI+gVQOOV9BLATzmHukwyXjgViCDNGEuu+JuA3OdWkrCkTvD/UCL2NBcdERLEu2qCSzLh8YuHDpBrAZHTWAWgGUh5hpUKojDqOTkT3W2zRf60SzAVH6PvrvUw/xM7qu+SU4Bxq9LOiJuOAqb9RaGUY4DLSS8hzbX6bEkjpYC44GABakOC1qXkkgKna6ePgIcKSofgI6NjJyH00SJzsXdYKaJ7+2Ad2xJPafmkhZYy0OHVFyko7c2XafuRIOjV+qFE5zqzqCt6X1bMppcS1XAFXASQf/sIQRAjmINiJWdE3njIBGUii3miCp0Ah019ZcdQSpoEugoV3e3oXI48kk+06JyBz47Wil6228qDUpQHzOX95vt5WqwWiK8C1VSCO+mvbr/fJ1FGJO7iTl4ZJRfKh+Ru0ZzZK3gXVIc6S+CJemEX/AwHR6plkxQKEfXkf8dl45HXaxlbvh+t991Nglbq9El5L1tzYIgrQBH/mSDfqu7CUAYEHPkEW8cqcjgzQX/KThqFOMIFNtR3jclEPq7B5TDEcgtz2iOPrHTINJNoYyMXpmiE6gWm98CDtn+nt6lihPrsntsF5GLjhNBRK8SXQcN5xPFkY7vnZCE/QbK+4aBjnp1GIVyfG8SJboMR/ckVynr3r9d0YWrqcgFd3LfgnDUFkxMcBwBL8IjvjlYUKDDkUYMi0lKTRKcz4AeX2buD5xWTgxLOEqMMgauOlaWCfttKvESayBvA310JwbH0QgyxDbCHHnUYKdSBbSqDkfZuSACbHqAQQKz3jkoKisX9ABa0PMNWMmIdR0ZjTrIl8ZDByaPUEqvNkYg3kDcHwlXoyxb3IjnCLwrS5JlAn6+Dkd5dvHGMgN0GqkeyUMRF/kGy1GCJZkYyuaoB1rQQeh3nWqoIIlY+liOyOg71l234Yc+tReQuY2YIx/kN8bTXgc18mBAmt4N9qLdMX6eNOeny1GukU39bBAhYdnKt78DG/l6xIMiMSJMiXSFHIGMKlOngOcikHkO2hMMjjKQnUZqkRS0OkAEfYYjUMOyIkpWwBG5Q6uTngTDbR2O1HN87MimVsTmjuTc4pONfLmIHKGbKUcwaULF/9jpdcY+GmEC6OIyV4kucsOwIeYIjzw1tAKOgHPdTf+EKQ0djvJt5JQOLXYasPrLuwUHM78bfKWDDVKLS8DRg5gjsCCJqm3EIhgnxoDxeKswADMIyCMGGW5g4RiOnoREVjYCjrDqdN5mMbHuK3BvdDjKuTlnEg3hlF1KWt7NCbmJQZAiToNOD04N+WKOoKjB2TpiqiPx+gKOAetDYF0Xz5biF4PkAirQOYnOB8lSaAa5PAPFbur3UZlFHY5yBEgRJ7EbR6xYnH3IERjF4EJY8vrWN8lgAzFKAwqOIx9wBLQYIxtwlslhnIg2I4kgxQZajWiOHpn+Y4g9mG821qIyH1oc5dxuK9muLj3pF/2vLvgJDfB8dWvU6rUmcCYhffX4OT5QH0KK6omhTuYAQO+Rt5YWB3ute3B+ZPPeeYGmSlZYOQKV/HC+jnAEvPT4+sCr0+Qo5+aPsXJLVzkn5ij3zneCWmJYucTO6mMry3N0A5l8j4f+hhSYpMV01MscRj1vq9F0urwfg4RCUqlIJMb9Sg2S/wlGv0tflUyVj+CtEI46DEf0+gwtjnLu/phMjb9AxvJ/KUlQkz9lHgUC5+0FNScrODLWoNudgjIePJHdY3qPqzuo9HeSkJhAgW6HgY//SE07RRx58KKrB8/zHqav8BLQTDHKjta1Whzl9cjistR0hR76u8DOd4KMqq9aUZyWhQg48mB5HVPoBmq3RopXIO5wwA5P3J3LpF5jn+OTlnqHkXuKI7okyXGopJUeRzmlIDYl8UlxdCTUdLZdVVQpiyq3mtJRJNpBVF/Xk6Y2HbgSYqAmiZSO0K996owx80eMkUkauQK/jlV2VIG+Lke5othq4jXEVizKFggMGvre8m4o9+vFVap8CVxym2/4zRPWErekFT9UZfdKkaZ2gFN4I7oNa0BCUdSIWl6LG32/kqQCuDJVJMysoNHjSBUhCde/ogFO9BvSe+zp6LvladQk6VZSNjkVDrY1Js8rrsl/qAmHlRkNVG4lociiCklWfDNria+cxFcCqa/PfDJrBTmCptZx6NyvHkeq3YL2J/4r2JGiihf0If+BLbezf2GfTbpkWVak+siPomsNwENJ1rb4A27Cx7W+uUqfzko05RPakgHd9I71lkNb1WE4qrS51TSzDpi1gj02KA+DvidNjuTKDk0gfHCfwo6kIBrr3xVmFyG7ugdJHlnyQV6Q7y/pLZdCJ5kSBukasdYbPDE871W4gqWzZLw55BG8c8UmS+ABoBYTmPRN8xSPwJlAjVYeEsEUFOtvIF/ILFHbiGopQ44wkueXmo0kYbqjdxuOhhg5CmhVCxQju3qAayikkZeq3sSfkpVt1tuAUVfeYzPBI1un3RuRx31b8kUMCYLmkrRDcZJwnUtnixttkskSfGE8+sHkPt1lbbaKt4zo4VZUr/hw+AOzDKCFf4G33LkfJLhPXNrsPZ2eYWlwJD7I+UYeNJyS3VOJUmkmPGtPJ7932520J4+NvFsAhieG53Vvss7zOq3uJGx5+6Bo6d+ENxH2pe6pga7YzFzTfD509kYDLEVh7MKOvDoiK/aR0WDyim/zKaQCUHgNZDx/Y7uEDBKSvT7JyPJfJ5f2aTbLLwTFBB34SFs/TS6gVMNvG1mrNJFkH1nZkEfG+nt1GkAo9ryFBj4xXEjJPdvIdUiYyLPH91l73v7LUO0dDb+k90wo2aEcQ+IxcFlsVX7JfGCnIDL3YE8Q75efFjBG2QbBh0UVc1Jn7sH+L0P9LQMgJ1HAm+ZyEBe8KeorP95yrSf6C6H+JgiwN2iaPJ3+WYuWWj6rvtxivglyDpTTSHCfhlAtJlubhFaMo6gvdz+qVfNtnfOQMVNnkzTPOk24hf43S5FqvT+CcRjOQsZcn71O1dSHnaQfTuyHeecZC8RM+HousipH7Oo8FoNFUgm8pr5CPpTvapLCaLpzkV19YldPSIIOseUfgqLt/vyo8YlYo+nOhkYZlx2aoH0yafEcq7z+cHd4Md/wvRb06iGR870+7g/r6vqwPx3X5lvYV0WOsu2IGE16ovbmm/IlQeeL1oXAuoAGhdHX3F4hP0VmRqI0DIt+y1dN0dpQVCKGmVFOEYqM110qdHeTyUGRUXRlQ/HhUEPR/wZ5V06qKTJO90WQc3GfkiITul4Iu7IY4msdDMrCsBSjJNjD3aBE5F9ByVNk9NyFkbX/c7YQaX5j1OAMZM18KxkSf0DJoGz0F/qJbZohe2GComthuC/Akl09GV/hmhhyC/kyGVoYhq6N/pxfFStXcuu50XI/go+9Dk1ozb/x5X4Qzwtl5UL42/pgkgo/juFuH5WYsMv9wwNHtGmGwf8D/
            eFufjgdX9bRhO365Xg6zJ+HxgRdDv8BLYhHtin1jGYAAAAASUVORK5CYII="
              className="mx-auto"
              width={140}
              alt=""
            />
          </Link>
        </div>
        <div className=" text-black">
          <div className="py-10 text-center w-1/2 mx-auto">
            <h1 className="text-3xl tracking-tighter my-4 font-semibold">
              Sign up for free to start listening.
            </h1>
            <span className="or__">or</span>
            <p className="my-4 font-bold">Sign up with your email address</p>
            <form
              onSubmit={registerUser}
              className="text-center mx-auto w-3/4 "
            >
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="email"
                  className="font-semibold mb-2 text-sm inline-block"
                >
                  What's your email?{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                />
              </div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="password"
                  className="font-semibold mb-2 text-sm inline-block"
                >
                  Create a password{" "}
                </label>
                <input
                  type="text"
                  id="password"
                  value={userDetails.password}
                  onChange={onChange}
                  name="password"
                  placeholder="Create a password"
                  className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                />
              </div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="username"
                  className="font-semibold mb-2 text-sm inline-block"
                >
                  What should we call you?{" "}
                </label>
                <input
                  type="text"
                  id="username"
                  value={userDetails.username}
                  onChange={onChange}
                  name="username"
                  placeholder="Create a password"
                  className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                />
                <small>it will appear on your profile</small>
              </div>
              <div className="text-left"></div>
              <div className="w-4/5 mx-auto text-left py-4">
                <label
                  htmlFor="password"
                  className="font-semibold mb-2 text-sm inline-block"
                >
                  What's your date of birth?
                </label>
                <div className="flex gap-8">
                  <div className="w-1/4">
                    <label htmlFor="day" className="ml-2 inline-block">
                      Day
                    </label>
                    <input
                      type="text"
                      value={userDetails.day}
                      onChange={onChange}
                      id="day"
                      name="day"
                      placeholder="DD"
                      className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                    />
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="month" className="ml-2 inline-block">
                      Month
                    </label>
                    <select
                      type="radio"
                      id="month"
                      value={userDetails.month}
                      onChange={onChange}
                      name="month"
                      placeholder="MM"
                      className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                    >
                      {months.map((m) => {
                        return (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="w-1/4">
                    <label htmlFor="year" className="ml-2 inline-block">
                      Year
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={userDetails.year}
                      onChange={onChange}
                      placeholder="YYYY"
                      className="block w-full rounded-[4px] border-0  text-black transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-black bg-[#fff]"
                    />
                  </div>
                </div>
                <div className="flex gap-8 mt-4">
                  <div className="">
                    <input
                      type="radio"
                      id="m"
                      name="gender"
                      placeholder="gender"
                      value={userDetails.gender}
                      checked={userDetails.gender === "M"}
                      onChange={onChange}
                      className=""
                    />
                    <label htmlFor="gender" className="ml-2 inline-block">
                      Male
                    </label>
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      id="f"
                      name="gender"
                      placeholder="gender"
                      checked={userDetails.gender === "F"}
                      className=""
                      value={userDetails.gender}
                      onChange={onChange}
                    />
                    <label htmlFor="f" className="ml-2 inline-block">
                      Female
                    </label>
                  </div>
                  <div className="">
                    <input
                      type="radio"
                      id="o"
                      name="gender"
                      placeholder="gender"
                      className=""
                      value={userDetails.gender}
                      checked={userDetails.gender === "O"}
                      onChange={onChange}
                    />
                    <label htmlFor="o" className="ml-2 inline-block">
                      Prefer not to say
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-4/5 mx-auto text-left py-4">
                <div className="my-4 flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="green-checkbox relative w-[1.7rem]
                    h-[1.2rem]"
                    name=""
                    id=""
                  />
                  <p className="text-sm">
                    I would prefer not to receive marketing messages from
                    Spotify
                  </p>
                </div>
                <div className="my-4 flex items-center gap-4">
                  <input
                    type="checkbox"
                    className="green-checkbox relative w-[1.7rem] h-[1.2rem]"
                    name=""
                    id=""
                  />
                  <p className="text-sm">
                    Share my registration data with JioSaavn's content providers
                    for marketing purposes.
                  </p>
                </div>
                <p className="my-4 text-xs">
                  By clicking on sign-up, you agree to{" "}
                  <Link to="/" className="text-green-400">
                    JioSaavn's Terms and Condition
                  </Link>{" "}
                  of Use.
                </p>
                <p className="my-4 text-xs">
                  To learn more about how Spotify collects, uses, shares and
                  protects your personal data, please see
                  <Link to="/" className="text-green-400">
                    JioSaavn's Privacy Policy.
                  </Link>{" "}
                </p>
              </div>

              <div className="w-full text-left py-4">
                <input
                  type="submit"
                  value="Sign up"
                  className="block cursor-pointer w-1/2 mx-auto outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full "
                />
              </div>
            </form>
            <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
            <p className="pt-8">
              <span className="text-gray-300 font-semibold">
                Don't have an account?{" "}
              </span>

              <Link
                to="/login"
                className="text-green-400 hover:text-green-400/90 font-semibold underline mx-auto"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

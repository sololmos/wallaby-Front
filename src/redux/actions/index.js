import axios from "axios";
import Moralis from "moralis";
import Swal from "sweetalert2";

export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}

export function review({ email, rating, username }) {
  const body = {
    email: email,
    rating: rating,
    username: username,
  };

  return async function (dispatch) {
    let json = await axios.post(
      `https://henry-proyecto-nft.herokuapp.com/${email}/reviews`,
      body
    );

    return dispatch({
      type: "POST_REVIEW",
      payload: json.data,
    });
  };
}

export function getReview() {
  return async function (dispatch) {
    let json = await axios.get(
      "https://henry-proyecto-nft.herokuapp.com/reviews"
    );

    return dispatch({
      type: "GET_REVIEWS",
      payload: json.data,
    });
  };
}

export function getNft() {
  return async function (dispatch) {
    let json = await axios.get(
      "https://henry-proyecto-nft.herokuapp.com/api/tests"
    );

    // let jsonB = await axios.get ("https://henry-proyecto-nft.herokuapp.com/api/tests/" + json.data.cursor)
    return dispatch({
      type: "GET_NFT",
      payload: json.data,
    });
  };
}
export function getNftDelHome() {
  return async function (dispatch) {
    let json = await axios.get(
      "https://henry-proyecto-nft.herokuapp.com/api/tests"
    );

    // let jsonB = await axios.get ("https://henry-proyecto-nft.herokuapp.com/api/tests/" + json.data.cursor)
    return dispatch({
      type: "GET_NFT_HOME",
      payload: json.data,
    });
  };
}
export function getNftAll(cursor) {
  return async function (dispatch) {
    let json = await axios.get(
      `https://henry-proyecto-nft.herokuapp.com/api/tests?cursor=${cursor}`
    );

    return dispatch({
      type: "GET_NFT_ALL20",
      payload: json.data,
    });
  };
}
// export function getNftAll2() {
//   return async function (dispatch) {
//     let json = await axios.get("https://henry-proyecto-nft.herokuapp.com/api/tests?cursor=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJxIjoiY2F0IiwiZGVzY3JpcHRpb24iOmZhbHNlLCJhdHRyaWJ1dGVzIjpmYWxzZSwibmFtZSI6ZmFsc2UsImdsb2JhbCI6dHJ1ZSwibGltaXQiOiIxMDAiLCJ0b2tlbl9hZGRyZXNzZXMiOm51bGwsIndoZXJlIjp7fSwicGFnZSI6Mywib2Zmc2V0IjowLCJrZXkiOiJmZmE1MDJhNzg2ZTc2YTA1MDAxMWE2YjdkYTIyYzEyYSIsInRvdGFsIjoyMjIyMDksImlhdCI6MTY1NzYzODk2OH0.dbLZGhrkLXVZklTpmAHFyHzZ26BWDUESmjkuztMvtfs");
//     let jsonB = await axios.get("https://henry-proyecto-nft.herokuapp.com/api/tests?cursor=" + json.data[0].cursor)
//     console.log("que hay aca2",jsonB.data)
//     return dispatch({
//       type: "GET_NFT_ALL2",
//       payload: jsonB.data
//     })
//   };
// }
// export function getNftAll3() {
//   return async function (dispatch) {
//     let json = await axios.get("https://henry-proyecto-nft.herokuapp.com/api/tests?cursor=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJxIjoiY2F0IiwiZGVzY3JpcHRpb24iOmZhbHNlLCJhdHRyaWJ1dGVzIjpmYWxzZSwibmFtZSI6ZmFsc2UsImdsb2JhbCI6dHJ1ZSwibGltaXQiOiIxMDAiLCJ0b2tlbl9hZGRyZXNzZXMiOm51bGwsIndoZXJlIjp7fSwicGFnZSI6Miwib2Zmc2V0IjowLCJrZXkiOiJmZmM3MjdmYjI0YTdmNGZiZTlkNWYzZmVjYmQzOWNiYSIsInRvdGFsIjoyMjIyOTAsImlhdCI6MTY1NzYzODk2OH0.SRdQbnHRnUpO8LULD2JUUNYL9djwGE6PM_IYFjI_OAM");
//     let jsonB = await axios.get("https://henry-proyecto-nft.herokuapp.com/api/tests?cursor=" + json.data[0].cursor)
//     console.log("que hay aca3",jsonB.data)
//     return dispatch({
//       type: "GET_NFT_ALL3",
//       payload: jsonB.data
//     })
//   };
// }

export function getDetail(_id, token_adress) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://henry-proyecto-nft.herokuapp.com/api/nftid?id=${_id}&token_address=${token_adress}`
      );

      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameNft(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "https://henry-proyecto-nft.herokuapp.com/api/nfts?name=" + name
      );
      return dispatch({
        type: "GET_NAME_NFT",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function recoverPassword() {
  return function (dispatch) {
    dispatch({
      type: "RECOVER_PASSWORD",
      payload: true,
    });
  };
}

export function createNft({ name, description, file }) {
  return async function (dispatch) {
    dispatch({
      type: "CREATE_NFT",
      payload: true,
    });
    try {
      const image = await uploadFile(file);
      const body = {
        image,
        name,
        description,
      };
      const json = await axios.post(
        "https://henry-proyecto-nft.herokuapp.com/api/nft",
        body
      );

      dispatch({
        type: "CREATE_NFT_SUCCESS",
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_NFT_ERROR",
        payload: true,
      });
    }
  };
}

export function createAcount({ nombre, email, password }) {
  return async function (dispatch) {
    dispatch({
      type: "CREATE_ACOUNT",
      payload: true,
    });
    try {
      const body = {
        nombre,
        email,
        password,
      };
      const json = await axios.post(
        "https://henry-proyecto-nft.herokuapp.com/api/registro",
        body
      );

      dispatch({
        type: "CREATE_ACOUNT_SUCCESS",
        payload: json.data,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Email existent",
        showConfirmButton: true,
      });
      console.log(error);
    }
  };
}

const uploadFile = async (file) => {
  const imageFile = new Moralis.File(file.name, file);
  await imageFile.saveIPFS();
  const imageURI = imageFile.ipfs();
  return imageURI;
};

export function getCollections(value) {
  return async function (dispatch) {
    let json = await axios.get(
      "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
    );
    const sinCursor = json.data.filter((e) => e.name);
    const type = sinCursor.filter((e) => e.category === value);

    return dispatch({
      type: "GET_COLLECTIONS",
      payload: type,
    });
  };
}

// export function getCollectionArt(type) {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_ART",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// export function getCollectionCol() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_COL",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
// export function getCollectionPho() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_PHO",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
// export function getCollectionGam() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_GAM",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
// export function getCollectionMus() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_MUS",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
// export function getCollectionSpo() {
//   return async function (dispatch) {
//     try {
//       let json = await axios.get(
//         "https://henry-proyecto-nft.herokuapp.com/api/nftcollection"
//       );
//       console.log("ESTA ES LA COLECCION", json);
//       return dispatch({
//         type: "GET_COLLECTION_SPO",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
export function resState() {
  return {
    type: "RES_STATE",
  };
}

export function addToCart(product) {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
}

export function removeOneFromCart(product) {
  return {
    type: "REMOVE_ONE_FROM_CART",
    payload: product,
  };
}

export function cleanCart(product) {
  return {
    type: "CLEAN_CART",
    payload: product,
  };
}

export function contador(contador) {
  return {
    type: "CONTADOR",
    payload: contador,
  };
}

export function botonMaximiliano(){
  return function(dispatch){
    return dispatch({
      type:"BOTON_MAXI"
    })
  }
}
export function postLogin(payload) {
  return async function (dispatch) {
    dispatch({
      type: "LOGIN_DATA",
      payload: payload,
    });
    axios
      .post("https://henry-proyecto-nft.herokuapp.com/api/login", payload)
      .then((response) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response,
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch({
            type: "LOGIN_ERROR",
            payload: true,
          });
          Swal.fire({
            icon: "error",
            text: "Email or password incorrect or inexistent",
            showConfirmButton: true,
          });
        }

        console.log(err);
      });
  };
}

export const removeFavorite = (id) => {
  return {
    type: "REMOVE_FAVORITE",
    payload: id,
  };
};
export const addFavorite = (info) => {
  return {
    type: "ADD_FAVORITE",
    payload: info,
  };
};

//-------------------------------------USER PROFILE------------------
export function getProfile(email) {
  return async function (dispatch) {
    try {
      const emailDos = email.email;
      const json = await axios.get(
        `https://henry-proyecto-nft.herokuapp.com/profile/` + emailDos
      );

      return dispatch({
        type: "GET_PROFILE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getProfileGoogle(email) {
  return async function (dispatch) {
    try {
      const email1 = email.user.email;
      const json = await axios.get(
        `https://henry-proyecto-nft.herokuapp.com/profile/` + email1
      );

      return dispatch({
        type: "GET_PROFILE_GOOGLE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updatedProfileById() {
  return async function (dispatch) {
    try {
      const json = await axios.put(
        `https://henry-proyecto-nft.herokuapp.com/profile/:token`
      );

      return dispatch({
        type: "UPDATED_PROFILE_BY_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//------------------------------------------------------

export const register = (body) => async (dispatch) => {
  // try {
  const newbody = { email: body.email, password: body.password };

  dispatch({
    type: "REGISTER_USER_REQUEST",
  });
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const { data } = await axios.post(
      "https://henry-proyecto-nft.herokuapp.com/auth/api/signup",
      body,
      config
    );
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    const errorString = String(err).slice(0, 5);
    if (errorString === "Error") {
      body = newbody;

      const { data } = await axios.post(
        "https://henry-proyecto-nft.herokuapp.com/auth/api/signin",
        body,
        config
      );
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });

      const profileGoogle = data;
      if (profileGoogle) {
        console.log(profileGoogle);
        localStorage.setItem("profileGoogle", JSON.stringify(profileGoogle));
      }

      Swal("Registro Exitoso", { icon: "success" });
      // window.location.href = "/home";
    } else {
      return console.log(err);
    }
  }

  // console.log("esta es la dataaa",data)
  // if(data.user.email) {

  // } else{

  // }

  // } catch (error) {
  //   Swal("Credenciales Incorrectas", { icon: "warning" });
  //   dispatch({
  //     type: 'REGISTER_USER_ERROR',
  //     payload: error,
  //   });
  // }
};

export const login =
  ({ email }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOGIN_REQUEST",
      });

      const data = await axios.post(
        `https://henry-proyecto-nft.herokuapp.com/auth/api/signin`,
        {
          email,
          // password,
        }
      );

      switch (data.request.status) {
        case 200:
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data.data,
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          // window.location.href = "/home";
          break;
        case 401:
          dispatch({
            type: "USER_LOGIN_ERROR",
            payload: data.error,
          });
          Swal("Not allow", { icon: "warning" });
          break;
        case 500:
          dispatch({
            type: "USER_LOGIN_ERROR",
            payload: data.error,
          });
          Swal("Internal server error", { icon: "warning" });
          break;
        default:
          break;
      }
    } catch (error) {
      Swal("Credenciales Incorrectas", { icon: "warning" });
      dispatch({
        type: "USER_LOGIN_ERROR",
        payload: error,
      });
    }
  };

export function singoutOk() {
  return {
    type: "SINGOUT_OK",
  };
}

export const usersDashboard = (dataa) => async (dispatch) => {
  //reemplazar el body con el body que viene por el params para funcionamiento total
  const body = { email: dataa.email, password: dataa.password };
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const { data } = await axios.post(
      "https://henry-proyecto-nft.herokuapp.com/admin/users",
      body
    );

    return dispatch({
      type: "GET_USERS_DASHBOARD",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserToAdmin = (dataa) => async (dispatch) => {
  //reemplazar el body con "dataa" que viene por el params para funcionamiento total
  const userEmail = dataa.userEmail;
  const body = { email: dataa.email, password: dataa.password };
  try {
    const { data } = await axios.put(
      `https://henry-proyecto-nft.herokuapp.com/admin/edit/${userEmail}`,
      body
    );
    return dispatch({
      type: "CHANGE_USER_TO_ADMIN",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAdminToUser = (dataa) => async (dispatch) => {
  //reemplazar el body con "dataa" que viene por el params para funcionamiento total
  const userEmail = dataa.userEmail;
  const body = { email: dataa.email, password: dataa.password };
  try {
    const { data } = await axios.put(
      `https://henry-proyecto-nft.herokuapp.com/admin/edituser/${userEmail}`,
      body
    );
    return dispatch({
      type: "CHANGE_ADMIN_TO_USER",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const suspendAccount = (dataa) => async (dispatch) => {
  //reemplazar el body con "dataa" que viene por el params para funcionamiento total
  const userEmail = dataa.userEmail;
  const body = { email: dataa.email, password: dataa.password };
  try {
    const { data } = await axios.put(
      `https://henry-proyecto-nft.herokuapp.com/admin/user/${userEmail}/status`,
      body
    );
    return dispatch({
      type: "SUSPEND_OR_UNSUSPEND_ACCOUNT",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export function updatePassword(todo) {
  const email = todo.email;
  const body = { password: todo.password };

  return async function (dispatch) {
    let json = await axios.put(
      `https://henry-proyecto-nft.herokuapp.com/${email}/updatePassword`,
      body
    );

    // let jsonB = await axios.get ("https://henry-proyecto-nft.herokuapp.com/api/tests/" + json.data.cursor)
    return dispatch({
      type: "PUT_UPDATE_PASSWORD",
      payload: json.data,
    });
  };
}

export function cambioPassword(payload) {
  return function (dispatch) {
    return dispatch({
      type: "OLVIDO_CONTRASE??A",
      payload: payload,
    });
  };
}

export function estaPorCambiarContrase??a(email) {
  return async function (dispatch) {
    let json = await axios.get(
      `https://henry-proyecto-nft.herokuapp.com/${email}/recoverpassword`
    );
    return dispatch({
      type: "ESTA_POR_CAMBIAR_CONTRASE??A",
      payload: json.data,
    });
  };
}

export function estaSeraLaContrase??a(todo) {
  const email = todo.email;
  const body = {
    password: todo.password,
    confirmPassword: todo.passwordConfir,
  };
  return async function (dispatch) {
    let json = await axios.put(
      `https://henry-proyecto-nft.herokuapp.com/${email}/newpassword`,
      body
    );
    return dispatch({
      type: "ESTA_SERA_NUEVA_CONTRASE??A",
      payload: json.data,
    });
  };
}

export function publishMarket(e) {
  return {
    type: "PUBLISH_MARKET",
    payload: e,
  };
}

import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import styles from "./AskerOption.module.scss";
import LetterIcon from "../../components/UI/icons/LetterIcon";
import ShareIcon from "../../components/UI/icons/ShareIcon";
import ContactLink from "../../components/UI/icons/Contact/ContactLink";
import CloseIcon from "../../components/UI/icons/CloseIcon";
import QuestionOption from "../../components/UI/icons/QuestionOption";
import EditCreateBtn from "../../components/UI/icons/Create/EditCreateBtn";
import MessageIcon from "../../components/UI/icons/MessageIcon";
import BellIcon from "../../components/UI/icons/BellIcon";
import TwoMenIcon from "../../components/UI/icons/TwoMenIcon";
import {http} from "../../http/http";

const AskerOption = (props) => {
    let navigate = useNavigate();
    const cardRef = useRef(null);
    const [selectPrivate, setSelectPrivate] = useState("");
    let chbox = document.getElementById('user');
  const location = useLocation();
  // const {companyId} = useParams();

  console.log('option',location?.state,  location?.state?.asker_id, location?.status, chbox)

    useEffect(async () => {
      if (cardRef?.current?.classList.contains("start-rotate")) {
        cardRef?.current?.classList.remove("start-rotate")
      }

      const timer = setTimeout(() => {
        cardRef?.current?.classList.add("start-rotate")
      }, 1);

      return () => clearTimeout(timer);
    }, [props]);

    const onChangePrivate = (e) => {
      e.preventDefault();
      console.log('SelectPrivate', selectPrivate, chbox?.checked);
      if (chbox != null) {
        if (!chbox?.checked) {
          setSelectPrivate("");
          activeAsker("i");
        } else {
          activeAsker("a");
          setSelectPrivate("checked");
        }
      }
    };

    const activeAsker = (status) => {
      http.post('inactiveAsker', `user_id=${location?.state?.user_id}&asker_id=${location?.state?.asker_id}&asker_status=${status}`)
        .then(resp => resp.data)
        .then((res) => {
          console.log('resOption', res);
          // if (res.status === true) {
          // setCountryData(res?.country);
          // }
        })
        .catch((err) => {
          console.log(err);
        })


      // fetch(SITEURL.FULLBASE_API + "inactiveAsker", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      //   body: parameter,
      // })
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //   })
      //   .catch((error) => {});
    };

  const showOption = (e) => {
    e.preventDefault();
    navigate(
      "/view-asker",
      {state: {
          asker_id: location?.state.asker_id,
          user_id: location?.state.user_id,
        }
      })
  }


  const showContact = () => {
      navigate('/contact-card')
    }
    return (
      <div className={styles.mainContainer}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.cardWrap} ${styles.cardLeft}`}>
            <div className={`${styles.cardBg} ${styles.cardBgSide}`}>
              <div className={styles.cardContainer}>
              </div>
            </div>
          </div>
          <div ref={cardRef} className={`default-flip flip-card-inner ${styles.cardWrap}`}>
            <div className={`${styles.cardBg}`}>
              {/*<div className={styles.closeBox}>*/}
              <button className={styles.btnClose} onClick={(e) => showOption(e)}>
                <CloseIcon className={styles.closeIcon}/>
              </button>
              {/*</div>*/}
              <div className={styles.cardContainer}>
                <div className={styles.titleBox}>
                  <QuestionOption className={styles.questionOption}/>
                  Asker Options
                </div>
                <div className={styles.btnBox}>
                  <button className={styles.contentBox}>
                    <div className={`${styles.optionBlock} `}>
                      <div className={styles.iconWrap}>
                        <EditCreateBtn className={styles.linkIcon}/>
                      </div>
                      <div onClick={()=>{
                        navigate('/edit-asker',{state:{
                            asker_id: location?.state.asker_id,
                            user_id: location?.state.user_id,
                            viewAsker:location?.state.viewAsker
                          }})
                      }} className={styles.textBox}>
                        <span className={styles.title}>Edit</span>
                        <span className={styles.text}>Edit this Asker</span>
                      </div>
                    </div>
                  </button>

                  <button className={styles.contentBox}>
                    <div className={`${styles.optionBlock} `}>
                      <div className={styles.iconWrap}>
                        <ShareIcon className={styles.linkIcon}/>
                      </div>
                      <div className={styles.textBox}>
                        <span className={styles.title}>Publish & Share</span>
                        <span className={styles.text}>Invite people to answer</span>
                      </div>
                    </div>
                  </button>
                  <button className={styles.contentBox}>
                    <div className={`${styles.optionBlock} `}>
                      <div className={styles.iconWrap}>
                        <MessageIcon className={styles.linkIcon}/>
                      </div>
                      <div className={styles.textBox}>
                        <span className={styles.title}>Contact</span>
                        <span className={styles.text}>Respond to your answers</span>
                      </div>
                    </div>
                  </button>
                  <button className={styles.contentBox}>
                    <div className={`${styles.optionBlock} `}>
                      <div className={styles.iconWrap}>
                        <BellIcon className={styles.linkIcon}/>
                      </div>
                      <div className={styles.textBox}>
                        <span className={styles.title}>Notifications</span>
                        <span className={styles.text}>Stay updated with this Asker</span>
                      </div>
                    </div>
                  </button>
                  <button className={styles.contentBox}>
                    <div className={`${styles.optionBlock} `}>
                      {/*<div className={styles.iconWrap}>*/}
                      <TwoMenIcon className={styles.menIcon}/>
                      {/*</div>*/}
                      <div className={styles.textBox}>
                        <span className={styles.title}>Collaborate</span>
                        <span className={styles.text}>Share Admin Access to this Asker</span>
                      </div>
                    </div>
                  </button>
                </div>
                <div className={`${styles.deactivateBlock}`}>
                  {/*<div className={styles.switchWrap}>*/}
                  {/*< className={styles.linkIcon}/>*/}
                  {/*</div>*/}
                  <div className={`${styles.acdcToogler}`}>
                    <input
                      type="checkbox"
                      className="toggle-switch-checkbox"
                      name="toggleSwitchPrivateuser"
                      id={"user"}
                      onChange={(e) => onChangePrivate(e)}
                      value={"private"}
                      checked={selectPrivate}
                    />
                    <span></span>
                  </div>
                  <div className={styles.textBox}>
                    <span className={styles.title}>Deactivate Asker</span>
                    <span className={styles.text}>Take this Asker offline</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rotate}>
              <div className="triangle-violet"/>
            </div>
          </div>

          <div className={`${styles.cardWrap} ${styles.cardRight}`}>
            <div className={`${styles.cardBg} ${styles.cardBgSide}`}>
              <div className={styles.cardContainer}>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
;

export default AskerOption;

var localHref=window.location.href,inputHidden=document.querySelector('input[name="_next"]');function hide(){"use strict";var e="//formspree.io/"+atob("c2V0Zm9ybXpAZ21haWwuY29t");document.querySelector(".feedback-form").setAttribute("action",e)}inputHidden.setAttribute("value",localHref),hide();var form=document.getElementsByClassName("feedback-form")[0];function captureForm(){alert("Thank you for your feedback.")}form.addEventListener("submit",captureForm,!1);
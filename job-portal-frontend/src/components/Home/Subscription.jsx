import React, {useState} from 'react'
import toast from "react-hot-toast";

const Subscription = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "e88c572f-9b40-4153-a4e8-53b65375ac6c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      setResult(false)
      event.target.reset();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center">
      <div className="bg-primary-color w-full h-[200px]"></div>
      <div className="res-subscription-container bg-primary-color find-bar-shad absolute flex p-[30px] md:p-[60px] w-[80%] gap-8 rounded-[40px]">
        <div className="res-subscription-header text-[25px] md:text-[28px] font-[700] leading-[1.3em] w-[50%]">
            <h1>Never Want to Miss Any <span className="text-third-text-color">Job News?</span></h1>
        </div>
        <div className="res-subscription-form-container w-[50%] flex flex-col items-center">
            <form onSubmit={onSubmit} className="bg-primary-color w-full px-[8px] py-[8px] rounded-full find-bar-shad flex gap-2 items-center">
                <input type="email" name="email" required className="bg-none w-full pl-[10px] border-none outline-none" placeholder="Enter Your Email Address" />
                <button type="submit" className="bg-third-text-color px-[35px] py-[10px] rounded-full text-primary-color text-[15px] font-[500] uppercase border-[2px] border-third-text-color btn-hover-btns">Submit</button>
            </form>
            <span className="mt-[10px] text-[14px] font-[600]">{result}</span>
        </div>
      </div>
      <div className="bg-secondary-color w-full h-[200px]"></div>
    </div>
  )
}

export default Subscription

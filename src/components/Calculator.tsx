import * as React from "react"
import { Link } from "gatsby"
import { graphql, type HeadFC, type PageProps, useStaticQuery } from "gatsby"
import Button from "./Button"
import { GatsbyImage } from "gatsby-plugin-image"
import FeatureItem from './FeatureItem';
import * as Slider from '@radix-ui/react-slider';
import toast from 'react-hot-toast';

// type Props = {
//     value: number; // was number[]
//     onValueChange: (value: number) => void; // was (value: number[]) => void;
// }


const Calculator = () => {
    const [purchasePrice, setPurchasePrice] = React.useState([500000]);
    const [downPayment, setDownPayment] = React.useState([135000]);
    const [repaymentTime, setRepaymentTime] = React.useState([25]);
    const [interestRate, setInterestRate] = React.useState([3]);
    const [loanAmount, setLoanAmount] = React.useState(0);
    const [estimatedMonthlyPayment, setEstimatedMonthlyPayment] = React.useState(0);
    const calculateLoanAmount = (
        purchasePrice: number,
        downPayment: number
    ) => {
        if (purchasePrice > downPayment) {
            setLoanAmount(purchasePrice - downPayment);
        } else {
            toast.error("Down payment cannot be greater than purchase price");
        }
    };

    const calculateMonthlyPayment = (
        purchasePrice: number,
        downPayment: number,
        repaymentTime: number,
        interestRate: number
    ) => {
        // 1. Get principal
        const principal = purchasePrice - downPayment;
        
        // 2. Convert interest rate to monthly 
        const monthlyInterestRate = interestRate / 12 / 100;  
    
        // 3. Calculate number of payments
        const numPayments = repaymentTime * 12;
        
        // 4. Plug into repayment formula
        const monthlyPayment = principal *  
          (monthlyInterestRate *  
           (1 + monthlyInterestRate) ** numPayments) /
          ((1 + monthlyInterestRate) ** numPayments - 1);
    
         // 5. Update state      
         setEstimatedMonthlyPayment(monthlyPayment);
      }


    return (
        <div>
            <div className="container mx-auto xl:pb-40 pb-12" id="calculator">
                <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-8 gap-10 xl:py-18 md:py-12 pt-12 pb-6 xl:px-0 md:px-12 px-0 items-center border-t border-neutral-200 relative">
                    <div className="flex flex-col gap-4 relative xl:text-left text-center bg-neutral-800 px-10 py-4">
                        <h3 className="text-white text-[50px] font-black leading-[70px] tracking-wide">
                            Mortgage Calculator
                        </h3>
                        <p className="md:text-body-lg text-body-md font-normal text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                        <div className="flex">
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="slider"
                                    className="text-white text-[1rem] font-[900] leading-[180%]"
                                >
                                    Purchase Price:  {
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }).format(purchasePrice)
                                }
                                </label>
                                <Slider.Root
                                    className="relative flex items-center select-none touch-none w-full h-5"
                                    id="slider"
                                    min={0}
                                    max={900000}
                                    step={10000}
                                    defaultValue={purchasePrice}
                                    value={purchasePrice}
                                    onValueChange={(value) => {
                                        setPurchasePrice(value);
                                        calculateLoanAmount(value, downPayment);
                                        calculateMonthlyPayment(value, downPayment, repaymentTime, interestRate);
                                    }}
                                >
                                    <Slider.Track className="bg-gray relative grow rounded-full h-[0.675rem]">
                                        <Slider.Range className="absolute bg-[#6CFDF1] rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="flex items-center justify-center w-[1rem] aspect-square bg-[#358b84] rounded-full">
                                        <div className="bg-gray w-[0.6875rem] aspect-square rounded-full"></div>
                                    </Slider.Thumb>
                                </Slider.Root>
                            </div>
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="slider"
                                    className="text-white text-[1rem] font-[900] leading-[180%]"
                                >
                                    Down Payment:  {
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }).format(downPayment)
                                }
                                </label>
                                <Slider.Root
                                    className="relative flex items-center select-none touch-none w-full h-5"
                                    id="slider"
                                    min={0}
                                    max={300000}
                                    step={5000}
                                    defaultValue={downPayment}
                                    value={downPayment}
                                    onValueChange={(value) => {
                                        setDownPayment(value);
                                        calculateLoanAmount(purchasePrice, value);
                                        calculateMonthlyPayment(purchasePrice, value, repaymentTime, interestRate);
                                    }}
                                >
                                    <Slider.Track className="bg-gray relative grow rounded-full h-[0.675rem]">
                                        <Slider.Range className="absolute bg-[#6CFDF1] rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="flex items-center justify-center w-[1rem] aspect-square bg-[#358b84] rounded-full">
                                        <div className="bg-gray w-[0.6875rem] aspect-square rounded-full"></div>
                                    </Slider.Thumb>
                                </Slider.Root>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="slider"
                                    className="text-white text-[1rem] font-[900] leading-[180%]"
                                >
                                    Repayment time: {repaymentTime} years
                                </label>
                                <Slider.Root
                                    className="relative flex items-center select-none touch-none w-full h-5"
                                    id="slider"
                                    min={0}
                                    max={60}
                                    step={1}
                                    defaultValue={repaymentTime}
                                    value={repaymentTime}
                                    onValueChange={
                                        (value) => {
                                            setRepaymentTime(value);
                                            calculateMonthlyPayment(purchasePrice, downPayment, value, interestRate);
                                        }
                                    }
                                >
                                    <Slider.Track className="bg-gray relative grow rounded-full h-[0.675rem]">
                                        <Slider.Range className="absolute bg-[#6CFDF1] rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="flex items-center justify-center w-[1rem] aspect-square bg-[#358b84] rounded-full">
                                        <div className="bg-gray w-[0.6875rem] aspect-square rounded-full"></div>
                                    </Slider.Thumb>
                                </Slider.Root>
                            </div>
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="slider"
                                    className="text-white text-[1rem] font-[900] leading-[180%]"
                                >
                                    Interest Rate: {interestRate}%
                                </label>
                                <Slider.Root
                                    className="relative flex items-center select-none touch-none w-full h-5"
                                    id="slider"
                                    min={0}
                                    max={12}
                                    step={0.1}
                                    defaultValue={interestRate}
                                    value={interestRate}
                                    onValueChange={
                                        (value) => {
                                            setInterestRate(value);
                                            calculateMonthlyPayment(purchasePrice, downPayment, repaymentTime, value);
                                        }
                                    }
                                >
                                    <Slider.Track className="bg-gray relative grow rounded-full h-[0.675rem]">
                                        <Slider.Range className="absolute bg-[#6CFDF1] rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="flex items-center justify-center w-[1rem] aspect-square bg-[#358b84] rounded-full">
                                        <div className="bg-gray w-[0.6875rem] aspect-square rounded-full"></div>
                                    </Slider.Thumb>
                                </Slider.Root>
                            </div>
                        </div>
                        <label
                            htmlFor="slider"
                            className="text-white text-[1rem] font-[900] leading-[180%]"
                        >
                            Loan amount:<span className="text-[#358b84] text-[1.5rem]"> 
                             {/*  // Check if down payment is greater */}
                                {downPayment > purchasePrice ? "Down payment cannot be greater than purchase price" :  new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }).format(loanAmount) }
                            </span>
                        </label>
                        <label
                            htmlFor="slider"
                            className="text-white text-[1rem] font-[900] leading-[180%]"
                        >
                            Estimated repayment per month:<span className="text-[#358b84] text-[1.5rem]"> 
                                {/* {Math.ceil (estimatedMonthlyPayment)} */}
                                {
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }).format(Math.ceil (estimatedMonthlyPayment))
                                }
                            </span>
                        </label>

                    </div>
                    <div className="flex flex-col gap-4 relative xl:text-left text-center">
                        <h3 className="lg:text-display-xl md:text-display-lg text-display-md font-semibold">
                            Try our awesome Calculator
                        </h3>
                        <p className="md:text-body-lg text-body-md font-normal text-neutral-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                        {/* button right */}
                        <div className="flex flex-row gap-4 justify-center xl:justify-start
                        ">
                            <Button link="/" label="Get Early Access" size="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Calculator;
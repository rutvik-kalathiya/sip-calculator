"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InvestmentChart from "./InvestmentChart";
import { Slider } from "@/components/ui/slider"; // ShadCN Slider

export default function InvestmentCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(20);
  const [futureValues, setFutureValues] = useState<
    { name: string; value: number }[]
  >([]);
  const [lumpsum, setLumpsum] = useState(10000); // Lumpsum Investment
  const [stepUpSip, setStepUpSip] = useState(5); // Step-up SIP % (Annual Growth)

  const calculateReturns = useCallback(() => {
    // Monthly Compounded Interest Rate
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1; 
    const totalMonths = years * 12;
    
    // Annual Step-Up Rate Corrected (10% -> 1.10 multiplier)
    const stepUpMultiplier = 1 + stepUpSip / 100; 

    // Total Invested Amount Calculation
    let investedAmount = lumpsum;
    let monthlyInvestmentAdjusted = monthlyInvestment;
    let futureValue_GA = 0;

    for (let month = 1; month <= totalMonths; month++) {
        // Apply step-up increment every 12 months
        if (month % 12 === 0) {
            monthlyInvestmentAdjusted *= stepUpMultiplier;
        }
        
        // Accumulate total invested amount
        investedAmount += monthlyInvestmentAdjusted;

        // Apply compound interest on each month's investment
        futureValue_GA = (futureValue_GA + monthlyInvestmentAdjusted) * (1 + monthlyRate);
    }

    // Corrected Daily Rate Calculation for Lump Sum
    const dailyRate = Math.pow(1 + rate / 100, 1 / 365) - 1;
    const lumpsumFutureValue = Math.round(lumpsum * Math.pow(1 + dailyRate, years * 365));

    // Total Future Value
    const totalFutureValue = futureValue_GA + lumpsumFutureValue;

    setFutureValues([
      { name: "Invested Amount", value: Math.round(investedAmount) },
      {
        name: "Estimated Returns",
        value: Math.round(totalFutureValue - investedAmount),
      },
    ]);
  }, [monthlyInvestment, rate, years, lumpsum, stepUpSip]); // ✅ Add dependencies

  useEffect(() => {
    calculateReturns();
  }, [calculateReturns]); // ✅ Now the function is included correctly


const formatNumber = (value: number, suffix: string = "") =>
  `${new Intl.NumberFormat("en-IN").format(value)}${suffix}`;

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (value: number) => void
) => {
  const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
  const numericValue = Number(rawValue);

  if (!isNaN(numericValue)) {
    setter(numericValue); // Update state
  }
};

  return (
    <section id="calculator" className="bg-background text-foreground flex items-center justify-center">
      <div className="container flex justify-center">
      <Card className="p-6 flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 shadow-lg w-full">
          {/* Left Side - Calculator */}
          <div className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle>SIP Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Lumpsum Investment */}
              <div className="mb-4 mt-4">
                <Label className="text-sm">Lumpsum Investment (₹)</Label>
                <div className="flex justify-between items-center">
                  <Slider
                    value={[lumpsum]}
                    max={1000000}
                    min={0}
                    step={5000}
                    onValueChange={(value) => setLumpsum(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="text" // Use text type for formatted display
                    value={formatNumber(lumpsum)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    max={1000000}
                    onChange={(e) => handleInputChange(e, setLumpsum)}
                    className={`w-36 overflow-x-auto appearance-none text-center`}
                  />
                </div>
              </div>
              {/* Monthly Investment */}
              <div className="mb-4">
                <Label className="text-sm">Monthly Investment (₹)</Label>
                <div className="flex justify-between items-center">
                  <Slider
                    value={[monthlyInvestment]}
                    max={1000000}
                    min={0}
                    step={1000}
                    onValueChange={(value) => setMonthlyInvestment(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={formatNumber(monthlyInvestment)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    max={1000000}
                    onChange={(e) => handleInputChange(e, setMonthlyInvestment)}
                    className={`w-36 overflow-x-auto appearance-none text-center`}
                  />
                </div>
              </div>

              {/* Step-up SIP Annually (%) */}
              <div className="mb-4">
                <Label className="text-sm">Step-up SIP Annually (%)</Label>
                <div className="flex justify-between items-center">
                  <Slider
                    value={[stepUpSip]}
                    max={15}
                    min={0}
                    step={0.1}
                    onValueChange={(value) => setStepUpSip(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={formatNumber(stepUpSip, " %")}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    max={15}
                    onChange={(e) => {
                      const rawValue = e.target.value
                        .replace(/,/g, "")
                        .replace(" %", "");
                      const numericValue = Number(rawValue);

                      if (!isNaN(numericValue)) {
                        setStepUpSip(numericValue); // Update state
                      }
                    }}
                    className={`w-36 overflow-x-auto appearance-none text-center`}
                  />
                </div>
              </div>

              {/* Expected Return Rate */}
              <div className="mb-4">
                <Label className="text-sm">Expected Return Rate (p.a)</Label>
                <div className="flex justify-between items-center">
                  <Slider
                    value={[rate]}
                    max={30}
                    min={1}
                    step={0.1}
                    onValueChange={(value) => setRate(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={formatNumber(rate, " %")}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    max={30}
                    onChange={(e) => {
                      const rawValue = e.target.value
                        .replace(/,/g, "")
                        .replace(" %", "");
                      const numericValue = Number(rawValue);

                      if (!isNaN(numericValue)) {
                        setRate(numericValue); // Update state
                      }
                    }}
                    className={`w-36 overflow-x-auto appearance-none text-center`}
                  />
                </div>
              </div>

              {/* Time Period */}
              <div className="mb-4">
                <Label className="text-sm">Time Period (Years)</Label>
                <div className="flex justify-between items-center">
                  <Slider
                    value={[years]}
                    max={40}
                    min={1}
                    step={1}
                    onValueChange={(value) => setYears(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={formatNumber(years, " Yr")}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    max={40}
                    onChange={(e) => {
                      const rawValue = e.target.value
                        .replace(/,/g, "")
                        .replace(" Yr", "");
                      const numericValue = Number(rawValue);

                      if (!isNaN(numericValue)) {
                        setYears(numericValue); // Update state
                      }
                    }}
                    className={`w-36 overflow-x-auto appearance-none text-center`}
                  />
                </div>
              </div>

              {/* Invested Amount, Returns, Total */}
              <div className="text-sm mt-6 space-y-2">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Invested Amount</span>
                  <span>
                    ₹
                    {new Intl.NumberFormat("en-IN").format(
                      futureValues[0]?.value || 0
                    )}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Est. Returns</span>
                  <span>
                    ₹
                    {new Intl.NumberFormat("en-IN").format(
                      futureValues[1]?.value || 0
                    )}
                  </span>
                </p>
                <p className="flex justify-between font-bold">
                  <span className="text-muted-foreground">Total Value</span>
                  <span>
                    ₹
                    {new Intl.NumberFormat("en-IN").format(
                      futureValues.reduce((acc, curr) => acc + curr.value, 0)
                    )}
                  </span>
                </p>
              </div>
            </CardContent>
          </div>

          {/* Right Side - Chart */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <InvestmentChart futureValues={futureValues} />
          </div>
        </Card>
      </div>
    </section>
  );
}

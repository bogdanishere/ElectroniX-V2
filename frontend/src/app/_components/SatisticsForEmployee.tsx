"use client";

import Button from "@/utils/Button";
import InputField from "@/utils/InputField";
import { PieChart } from "@mui/x-charts";
import { useState } from "react";
import { getBrandCount } from "../_lib/actions";

interface BrandSatisticsProps {
  brands: { brand: string; _count: { brand: number } }[];
}

export default function SatisticsForEmployee({
  dataStatistics,
  width = 400,
  height = 200,
}: {
  dataStatistics: { name: string; value: number; label: string }[];
  width?: number;
  height?: number;
}) {
  const [numberOfBrands, setNumberOfBrands] = useState<number>(3);
  const [data, setData] = useState(dataStatistics);
  const [loading, setLoading] = useState(false);

  const fetchBrandData = async () => {
    try {
      setLoading(true);
      if (numberOfBrands < 1 || numberOfBrands > 15) {
        setLoading(false);
        return;
      }

      const brands: BrandSatisticsProps = await getBrandCount(numberOfBrands);

      setData(
        brands.brands.map((brand) => ({
          name: brand.brand,
          value: brand._count.brand,
          label: `${brand.brand} - ${brand._count.brand}`,
        }))
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <InputField
        label="Number of Brands you want to be displayed"
        type="number"
        name="numberOfBrands"
        value={numberOfBrands}
        onChange={(e) => setNumberOfBrands(Number(e.target.value))}
      />
      <Button onClick={fetchBrandData}>
        {loading ? "Loading..." : "Get Statistics"}
      </Button>

      <div className="mt-16">
        <PieChart
          series={[
            {
              data,
            },
          ]}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}

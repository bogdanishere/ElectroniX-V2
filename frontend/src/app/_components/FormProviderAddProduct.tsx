import InputField from "@/utils/InputField";
import { addProviderProduct } from "../_lib/actions";
import Button from "@/utils/Button";

export default function FormProviderAddProduct({
  page,
}: {
  page: string | number;
}) {
  return (
    <div className="flex justify-center">
      <form action={addProviderProduct} className="pt-5 w-[800px]">
        <InputField name="productName" type="text" label="Product Name" />
        <InputField name="price" type="number" label="Price" />
        <InputField name="brand" type="text" label="Brand" />
        <InputField
          name="currency"
          type="text"
          label="Currency"
          defaultValue={"USD"}
          readOnly
        />
        <InputField name="weight" type="text" label="Weight" />
        <InputField name="categories" type="text" label="Categories" />
        <InputField name="description" type="text" label="Description" />
        <InputField
          name="quantity"
          type="number"
          label="How many products do you have?"
        />
        <InputField name="image" type="file" label="Featured Image" />
        <InputField value={page} name="page" type="hidden" />

        <Button type="submit" className="mt-5 ">
          Submit
        </Button>
      </form>
    </div>
  );
}

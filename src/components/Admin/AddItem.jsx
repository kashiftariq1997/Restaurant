import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { fadeIn } from "../../utils/variants";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { showToast } from "../../utils/ToastNotification";
import CustomSize from "./CoustomSize";
import CustomExtras from "./CoustomExtras";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/Products/productSlice";


const AddItem = ({ value, setValue }) => {
  const [showExtras, setShowExtras] = useState(false);
  
// Complete input state
const [formValues, setFormValues] = useState({
  name: "",
  price: "",
  category: "",
  tax: "",
  image: "", // We'll deal with this later
  type: "",
  isFeatured: false, // Set default to false (boolean)
  status: "",
  sizes: [], // This can stay as an array of strings
  extras: [],
  caution: "",
  description: "", // Fix typo from "discription" to "description"
});

   const dispatch=useDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   setValue: setFormValue,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     sizes: ["Small", "Medium", "Large"],
  //     extras: [],
  //   },
  // });

  // Handle input change function
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "sizes" || name === "extras") {
      // Handle array fields like sizes and extras
      const updatedArray = name === "sizes" ? formValues.sizes : formValues.extras;
      const newArray = value ? [...updatedArray, value] : updatedArray; // Add new value to array
      setFormValues((prevState) => ({
        ...prevState,
        [name]: newArray,
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file from the input element
    if (file) {
      setFormValues((prevState) => ({
        ...prevState,
        image: file,  // Store the file object
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure sizes and extras are correctly passed as arrays
    const formData = {
      ...formValues,
      sizes: Array.isArray(formValues.sizes) ? formValues.sizes : [], // Ensure sizes is an array
      extras: Array.isArray(formValues.extras) ? formValues.extras : [], // Ensure extras is an array
    };
  
    // Log form data to check
    console.log(formData);
    console.log(formData.sizes); // Logs sizes array
    console.log(formData.extras); // Logs extras array
    console.log(JSON.stringify(formData));
    // Dispatch the addProduct action with the form data
    dispatch(addProduct(formData));
  
    // Show success toast and close modal
    showToast("Item added successfully!");
    setValue(false); // Close the modal after submission
  };
  
  return (
    <>
      {value && (
        <section className="fixed h-[90vh] xl:h-[93vh] w-[100vw] z-[] bg-black/60">
          <m.div
            variants={fadeIn("left", 400)}
            initial="hidden"
            animate="show"
            className="flex relative flex-col float-end bg-white h-full w-full md:w-[580px] overflow-y-auto overflow-x-hidden pb-5"
          >
            <div className="flex justify-between p-4 border-b border-lightGray/20">
              <h1 className="text-xl text-dark">Items</h1>
              <button onClick={() => setValue(false)}>
                <IoClose className="text-xl text-lightGray" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-5 w-full"
            >
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label htmlFor="name" className="text-xs text-lightGray">
                    NAME <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                    // {...register("name", { required: "Name is required" })}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label htmlFor="price" className="text-xs text-lightGray">
                    PRICE <span className="text-primary">*</span>
                  </label>
                  <input
                    id="price"
                    className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                    required
                   // {...register("price", { required: "Price is required" })}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="category" className="text-xs text-lightGray">
                    CATEGORY <span className="text-primary">*</span>
                  </label>
                  <select
                    id="category"
                    className="flex-1 border border-lightGray/20 p-2 bg-transparent rounded-md text-sm text-lightGray"
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                    required
                    // {...register("category", {
                    //   required: "Category is required",
                    // })}
                  >
                    <option selected disabled>
                      --
                    </option>
                    <option value="salades">SALADES</option>
                    <option value="fastfood">FASTFOOD</option>
                    <option value="plates chauds">PLATES CHAUDS</option>
                    <option value="soupes">SOUPES</option>
                    <option value="non aperitifs">NON APERITIFS</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="tax" className="text-xs text-lightGray">
                    TAX (INCLUDING)
                  </label>
                  <select
                    id="tax"
                    className="flex-1 border bg-transparent border-lightGray/20 p-2 rounded-md text-sm text-lightGray"
                    name="tax"
                    value={formValues.tax}
                    onChange={handleInputChange}
                    // {...register("tax")}
                  >
                    <option selected disabled>
                      --
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label htmlFor="image" className="text-xs text-lightGray">
                    IMAGE <span className="text-primary">*</span>
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="cursor-pointer border rounded-md p-1 border-lightGray/20 w-64 text-lightGray"
                    name="image"
                    onChange={handleImageChange}
                    // {...register("image", { required: "Image is required" })}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label htmlFor="type" className="text-xs text-lightGray">
                    ITEM TYPE
                  </label>
                  <div className="flex items-center py-2 gap-4 text-lightGray text-sm">
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="type"
                        className="accent-primary"
                        value={formValues.type}
                        // {...register("type")}
                      />
                      Veg
                    </label>
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="type"
                        value={formValues.type}
                        className="accent-primary"
                        // {...register("type")}
                      />
                      Non-Veg
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label
                    htmlFor="isFeatured"
                    className="text-xs text-lightGray"
                  >
                    IS FEATURED
                  </label>
                  <div className="flex items-center py-2 gap-4 text-lightGray text-sm">
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="isFeatured"
                        value={formValues.isFeatured}
                        className="accent-primary"
                         // {...register("isFeatured")}
                      />
                      Yes
                    </label>
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="isFeatured"
                        value={formValues.isFeatured}
                        className="accent-primary"
                        // {...register("isFeatured")}
                      />
                      No
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full flex-1">
                  <label htmlFor="status" className="text-xs text-lightGray">
                    Status
                  </label>
                  <div className="flex items-center py-2 gap-4 text-lightGray text-sm">
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        value={formValues.status}
                        className="accent-primary"
                        //{...register("status")}
                      />
                      Active
                    </label>
                    <label className="flex gap-1">
                      <input
                        type="radio"
                        name="status"
                        value={formValues.status}
                        className="accent-primary"
                        //{...register("status")}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              {/* CoustomSize  */}
              <CustomSize
                sizes={formValues.sizes}
                setSizes={(updatedSizes) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    sizes: updatedSizes,
                  }))
                }
              />
              {/* Extras toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="addExtras"
                  checked={showExtras}
                  onChange={() => {setShowExtras(!showExtras);
                                  handleInputChange;
                  }}
                  className="accent-primary"
                  name="extras"
                  value={formValues.extras}
                />
                <label htmlFor="addExtras" className="text-xs text-lightGray">
                  Add Extras
                </label>
              </div>

              {/* Display the extras section if checked */}
              {showExtras && (
                <CustomExtras
                extras={formValues.extras}
                setExtras={(updatedExtras) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    extras: updatedExtras,
                  }))
                }
              />
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="caution" className="text-xs text-lightGray">
                  CAUTION
                </label>
                <textarea
                  id="caution"
                  className="border border-lightGray/20 p-2 bg-transparent rounded-md text-sm text-lightGray"
                    name="caution"
                    value={formValues.caution}
                    onChange={handleInputChange}
                  rows="4"
                  //{...register("caution")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discription" className="text-xs text-lightGray">
                  DISCRIPTION
                </label>
                <textarea
                  id="discription"
                  className="border border-lightGray/20 p-2 bg-transparent rounded-md text-sm text-lightGray"
                  name="description"
                  value={formValues.discription}
                  onChange={handleInputChange}
                  rows="4"
                  //{...register("discription")}
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="text-white py-1 px-4 bg-secondary taxt-sm rounded-md "
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-dark py-1 px-4 border border-lightGray/20 taxt-sm rounded-md "
                  onClick={() => setValue(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </m.div>
        </section>
      )}
    </>
  );
};

export default AddItem;

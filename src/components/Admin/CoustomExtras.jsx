import { IoClose } from "react-icons/io5";

const CustomExtras = ({ extras, setExtras }) => {
  const handleAddExtra = () => {
    const newExtras = [...extras, { name: "New Extra", price: 0 }];
    setExtras("extras", newExtras); // Update form state
  };

  const handleRemoveExtra = (index) => {
    const newExtras = extras.filter((_, i) => i !== index);
    setExtras("extras", newExtras); // Update form state
  };

  const handleExtraChange = (index, field, value) => {
    const updatedExtras = [...extras];
    updatedExtras[index][field] = value;
    setExtras("extras", updatedExtras); // Update form state
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-lightGray">EXTRAS</label>
      <div className="flex flex-col gap-2">
        {extras.map((extra, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={extra.name}
              onChange={(e) => handleExtraChange(index, "name", e.target.value)}
              className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray w-full"
              placeholder="Extra Name"
            />
            <input
              type="number"
              value={extra.price}
              onChange={(e) =>
                handleExtraChange(index, "price", e.target.value)
              }
              className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray w-24"
              placeholder="Price"
            />
            <button
              type="button"
              onClick={() => handleRemoveExtra(index)}
              className="text-orange text-sm"
            >
              <IoClose />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExtra}
          className="text-white bg-green rounded-md w-fit px-4 py-1 text-sm mt-2"
        >
          Add Extra
        </button>
      </div>
    </div>
  );
};

export default CustomExtras;

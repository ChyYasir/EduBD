import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductByIDAsync,
  selectBrands,
  selectCategories,
  selectProductByID,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectLoggedInInstructor } from "../instructorSlice";
import { fetchAllProducts } from "../../product/productAPI";

function InstructorProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductByID);
  const instructor = useSelector(selectLoggedInInstructor);
  const [selectedImage, setSelectedImage] = useState("");
  const [structure, setStructure] = useState([
    {
      chapterTitle: "",
      links: [{ linkTitle: "", url: "" }],
    },
  ]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);
  const handleChapterTitleChange = (index, event) => {
    const newStructure = [...structure];
    newStructure[index].chapterTitle = event.target.value;
    setStructure(newStructure);
  };

  const handleLinkTitleChange = (chapterIndex, linkIndex, event) => {
    const newStructure = [...structure];
    newStructure[chapterIndex].links[linkIndex].linkTitle = event.target.value;
    setStructure(newStructure);
  };

  const handleLinkUrlChange = (chapterIndex, linkIndex, event) => {
    const newStructure = [...structure];
    newStructure[chapterIndex].links[linkIndex].url = event.target.value;
    setStructure(newStructure);
  };

  const handleRemoveChapter = (chapterIndex) => {
    const newStructure = [...structure];
    newStructure.splice(chapterIndex, 1);
    setStructure(newStructure);
  };
  const handleAddChapter = () => {
    const newStructure = [
      ...structure,
      { chapterTitle: "", links: [{ linkTitle: "", url: "" }] },
    ];
    setStructure(newStructure);
  };

  const handleAddLink = (chapterIndex) => {
    const newStructure = [...structure];
    newStructure[chapterIndex].links.push({ linkTitle: "", url: "" });
    setStructure(newStructure);
  };
  const handleRemoveLink = (chapterIndex, linkIndex) => {
    const newStructure = [...structure];
    newStructure[chapterIndex].links.splice(linkIndex, 1);
    setStructure(newStructure);
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIDAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("topic", selectedProduct.topic);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };
  console.log({ brands });
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          console.log(data);
          console.log(structure);

          const product = { ...data, instructor: instructor.id };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.rating = 0;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          console.log(product);

          formData.append("title", product.title);
          formData.append("description", product.description);
          formData.append("price", product.price);
          formData.append("discountPercentage", product.discountPercentage);
          formData.append("rating", product.rating);
          formData.append("brand", product.brand);
          formData.append("category", product.category);
          formData.append("instructor", product.instructor);
          formData.append("thumbnail", selectedImage);
          formData.append("structure", JSON.stringify(structure));
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(formData));
            reset();
          } else {
            dispatch(createProductAsync(formData));
            reset();
            //TODO:  on product successfully added clear fields and show a message
          }
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="leading-7 text-primary text-3xl text-center font-bold">
              Upload A Course
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "name is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Topic
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "topic is required",
                    })}
                  >
                    <option value="">--choose topic--</option>
                    {brands.map((topic) => (
                      <option value={topic.value}>{topic.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div> */}

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div>
                  <input
                    type="file"
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  ></input>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Course Outline
                </label>
                <div className=" grid gap-4 md:grid-cols-4 sm:grid-cols-2 mb-5">
                  {structure.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Chapter Title"
                        value={chapter.chapterTitle}
                        onChange={(event) =>
                          handleChapterTitleChange(chapterIndex, event)
                        }
                      />
                      {chapter.links.map((link, linkIndex) => (
                        <div>
                          <div key={linkIndex} className="mb-3">
                            <input
                              type="text"
                              placeholder="Link Title"
                              value={link.linkTitle}
                              onChange={(event) =>
                                handleLinkTitleChange(
                                  chapterIndex,
                                  linkIndex,
                                  event
                                )
                              }
                            />
                            <input
                              type="text"
                              placeholder="Link URL"
                              value={link.url}
                              onChange={(event) =>
                                handleLinkUrlChange(
                                  chapterIndex,
                                  linkIndex,
                                  event
                                )
                              }
                            />
                          </div>
                          <div
                            type="button"
                            onClick={() => handleRemoveLink(chapterIndex)}
                            className=" text-center rounded-md  bg-red-800 px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Remove This Video
                          </div>
                        </div>
                      ))}
                      <div className="felx flex-col ">
                        <div
                          type="button"
                          onClick={() => handleAddLink(chapterIndex)}
                          className="rounded-md w-1/2 text-center bg-indigo-600 px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add New Video
                        </div>

                        <div
                          type="button"
                          onClick={() => handleRemoveChapter(chapterIndex)}
                          className="rounded-md w-4/5 text-center bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500  hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Remove This Chapter
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddChapter}
                  className="rounded-md bg-green-600 px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Chapter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>

          {selectedProduct && (
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}

export default InstructorProductForm;

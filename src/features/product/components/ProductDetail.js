import { useEffect, useState } from "react";
import {
  StarIcon,
  ArrowDownIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { fetchProductByIDAsync, selectProductByID } from "../productSlice";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { selectUserInfo } from "../../user/userSlice";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];
// const reviews = { href: "#", average: 4, totalCount: 117 };
const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProductByID);
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  // const [purchased, setPurchased] = useState(0);
  //TODO: in server data we will colors, sizes
  const dispatch = useDispatch();

  const params = useParams();
  let purchased = 0;
  if (userInfo && userInfo.products) {
    // Safely access myArray.length
    for (let i = 0; i < userInfo.products.length; i++) {
      // console.log("lol");
      if (userInfo.products[i] === params.id) {
        purchased = 1;
      }
    }
  }
  // console.log(user);
  // console.log(user.products);
  // console.log(params.id);
  console.log({ purchased });
  const [expandedChapter, setExpandedChapter] = useState(null);

  const handleChapterClick = (chapterIndex) => {
    if (expandedChapter === chapterIndex) {
      setExpandedChapter(null); // Collapse if already expanded
    } else {
      setExpandedChapter(chapterIndex);
    }
  };
  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = { product: product.id, user: user.id };
      // delete newItem["id"];
      dispatch(addToCartAsync(newItem));
    }
  };
  useEffect(() => {
    dispatch(fetchProductByIDAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <>
      {!user && (
        <Navigate to={"/courses"} replace={true}>
          {" "}
        </Navigate>
      )}
      <div className="bg-white">
        {product && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
              <div className="lg:col-span-4 lg:border-r lg:border-gray-200 lg:pr-8">
                <div>
                  <img
                    src={`http://localhost:8080/${product.thumbnail}`}
                    alt={product.title}
                  />
                </div>
                <p>Created By {product.instructor.name}</p>
                <h1 className="text-4xl font-bold  text-gray-900 mb-8">
                  {product.title}
                </h1>
                <div>
                  <h2 className="text-2xl font-bold">Course Description</h2>
                  <p>{product.description}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Course Outline</h2>
                  <div className="border border-solid border-gray-300">
                    {product.structure.map((chapter, chapterIndex) => (
                      <div key={chapterIndex}>
                        <div
                          className="cursor-pointer p-2 bg-gray-100 mb-2 flex justify-between"
                          onClick={() => handleChapterClick(chapterIndex)}
                        >
                          <h1>{chapter.chapterTitle}</h1>

                          {expandedChapter !== chapterIndex && (
                            <AiOutlineDown />
                          )}
                          {expandedChapter === chapterIndex && <AiOutlineUp />}
                          {/* <ArrowDownIcon className="w-6 h-6"></ArrowDownIcon> */}
                        </div>
                        {expandedChapter === chapterIndex && (
                          <div className="ml-4">
                            {chapter.links.map((material, materialIndex) => (
                              <div
                                key={materialIndex}
                                className="mb-3 border-b flex"
                              >
                                <VideoCameraIcon className="h-6 w-6"></VideoCameraIcon>
                                {purchased === 1 && (
                                  <Link
                                    to={`/product-detail/${params.id}/video/${material.url}`}
                                  >
                                    <h2>{material.linkTitle}</h2>
                                  </Link>
                                )}
                                {purchased === 0 && (
                                  <h2>{material.linkTitle}</h2>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 lg:col-span-2 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${product.price}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    ></RadioGroup>
                  </div>

                  <div className={` ${purchased === 1 ? "hidden" : ""}`}>
                    <button
                      onClick={handleCart}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className={` ${purchased === 0 ? "hidden" : ""}`}>
                    <h2 className="text-2xl text-primary font-bold">
                      You have already enrolled into this course{" "}
                    </h2>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

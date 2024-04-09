import { Allproducts } from '@/components/sharedComponents/product/allProducts';

export const metadata = {
  title: 'Products',
  description: 'CV Indoline Store Products list',
};

const ProductsPage = () => {
  return (
    <div className="pt-32 ">
      <Allproducts />
    </div>
  );
};

export default ProductsPage;

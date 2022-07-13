import { useRouter } from "next/router"
import Link from 'next/link'
import styles from '../../styles/Home.module.css';

// //SSGの場合
// //SSRよりも素早く頁の切り替えが行われる
// //getStaticPropsはアプリをbuild時に一度だけ実行される
// //データが一度にすべて読み込まれる
// //故に、画像を含むページの繊維などが超高速
// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`)
//   const data = await req.json()

//   return {
//     props: {
//       //smartphone.json, pc.json, headphone.jsonなの中のjsonデータ
//       product: data,
//     }
//   }
// }

// //getStaticPropsを使うにあたって必要
// //静的に生成されるパスのリストを定義する必要がある
// export async function getStaticPaths() {
//   const req = await fetch(`http://localhost:3000/products.json`)
//   const data = await req.json()

//   const paths = data.map(product => {
//     return {
//       params: {
//         id: product,
//       }
//     }
//   })

//   return {
//     paths,
//     fallback: false,//pathで設定されていないものはすべて404 not foundで返す
//   }
// }


//SSRの場合
//ユーザーのリクエスト時にレンダリングされるようになる
export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`)
  const data = await req.json()

  return {
    props: {
      //smartphone.json, pc.json, headphone.jsonなの中のjsonデータ
      product: data,
    }
  }
}


const Product = ({product}) => {
  const router = useRouter()
  const {id} = router.query
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{id}のページです</h1>
        <img src={product.image} alt="商品の画像" width="300" height="400" />
        <p>{product.name}</p>
        <br></br>
        <Link href="/products">
          <a>商品一覧へ</a>
        </Link>
      </main>
    </div>
  );
}

export default Product;
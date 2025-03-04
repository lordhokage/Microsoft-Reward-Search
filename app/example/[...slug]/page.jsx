export default function BlogPost({ params }) {
  console.log(params.slug);
  return (
    <div>
      <h1>Blog Post</h1>
      <p>Slug: {JSON.stringify(params.slug)}</p>
    </div>
  );
}

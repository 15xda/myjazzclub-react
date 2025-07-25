export default function PressToStart({ setInteracted }) {
  return (
    <h1
      className="text-3xl text-white mb-5"
      onClick={() => setInteracted(true)}
    >
      Interact to Start ...
    </h1>
  );
}

const CompingSoon = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="/images/20250118_2114_Pakistani Fashion Preview_simple_compose_01jhx33psdf9hs4eqss7tfvjjn.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default CompingSoon;

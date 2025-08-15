
import "./bouncingBlobs.css";
export function Background({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="fixed w-screen h-screen overflow-hidden bg-background  ">
				<div className="blob bg-chart-3" />
				<div className="blob blob4 bg-chart-2" />
				<div className="blob blob2 bg-chart-4" />
				<div className="blob blob3 bg-chart-1" />
			</div>
			<div className="fixed  bg-transparent">
				{children}
			</div>
		</>
	);
}

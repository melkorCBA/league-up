import Image from "next/image";
import React from "react";
import useData from "../hooks/useData";
const Table = ({ data }) => {
  const teams = useData(data);
  return (
    <div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th></th>
            <th>Team</th>
            <th>Pld</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>PTS</th>
            <th>NR</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((d, i) => (
            <tr key={d._id} className={i < 2 ? "table-primary" : ""}>
              <td>
                <span>{i + 1}</span>
              </td>

              <td className="d-flex flex-row w-100">
                <Image
                  alt={d.teamName}
                  src={d.logoURL}
                  width={"40px"}
                  height={"40px"}
                />

                <div className="mx-2">{d.teamName}</div>
                <div>
                  {d.isQualified === 1 ? (
                    <span className="text-white bg-success">Q</span>
                  ) : (
                    ""
                  )}
                </div>
              </td>

              <td>{d.pld}</td>
              <td>{d.win}</td>
              <td>{d.draw}</td>
              <td>{d.loss}</td>
              <td>{d.pts}</td>
              <td>{d.nr?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

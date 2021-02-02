import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Vex from 'vexflow';
import PartEditor from '../../components/PartEditor/PartEditor';
import { PartNote } from '../../dataset/all_chords_for_impro';
import { VexFlowController } from './VexFlowController';

interface Props {
  notes: PartNote[];
}

export const SheetStave = ({ notes }: Props) => {
  const VF = Vex.Flow;
  const ref = useRef(null);

  const vexflowController = new VexFlowController(notes);

  useEffect(() => {
    if (ref.current) {
      const renderer = new VF.Renderer(ref?.current!, VF.Renderer.Backends.SVG);

      // Configure the rendering context.
      renderer.resize(1000, 500);
      const context = renderer.getContext();
      context.setFont('Arial', 10).setBackgroundFillStyle('#eed');

      // Create a stave of width 400 at position 10, 40 on the canvas.

      // Connect it to the rendering context and draw!

      var staveMeasure1 = new Vex.Flow.Stave(0, 0, 1000);
      staveMeasure1.addClef('treble').setContext(context).draw();

      var notesMeasure1 = vexflowController.convertToVexflow(notes);
      console.log('notesMeasure1', notesMeasure1);

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
      // const beams = [new VF.Beam(notesMeasure1)];
      // beams.forEach(function (b) {
      //   b.setContext(context).draw();
      // });

      // // measure 2 - juxtaposing second measure next to first measure
      // // @ts-ignore
      // var staveMeasure2 = new Vex.Flow.Stave(staveMeasure1.width + staveMeasure1.x, 0, 400);
      // staveMeasure2.setContext(context).draw();

      // var notesMeasure2_part1 = [
      //   new Vex.Flow.StaveNote({ keys: ['c/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['d/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['b/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' }),
      // ];

      // var notesMeasure2_part2 = [
      //   new Vex.Flow.StaveNote({ keys: ['c/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['d/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['b/4'], duration: '8' }),
      //   new Vex.Flow.StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: '8' }),
      // ];

      // // create the beams for 8th notes in 2nd measure
      // var beam1 = new Vex.Flow.Beam(notesMeasure2_part1);
      // var beam2 = new Vex.Flow.Beam(notesMeasure2_part2);

      // var notesMeasure2 = notesMeasure2_part1.concat(notesMeasure2_part2);

      // Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

      // // Render beams
      // beam1.setContext(context).draw();
      // beam2.setContext(context).draw();
    }
  }, []);

  return (
    <Container>
      <div ref={ref} id="vf"></div>
      <PartEditor />
    </Container>
  );
};

const Container = styled.div`
  margin: 40px 0;
`;

import PartCreator from './PartCreator'

export default class PartsFabric {
    constructor(chords, squaresCount){
        this.chords = chords;
        console.log('this.chords ', this.chords);
        this.parts = [];
        this.squaresCount = squaresCount;
    }

    addPart(partOptions){
        console.log(partOptions);
        const part = new PartCreator(this.chords, this.squaresCount, partOptions.notes, partOptions.type, partOptions.pattern ).notes;
        this.parts.push(part);
        console.log(this.parts);
    }

    

    getParts(){
        return this.parts;
    }
}
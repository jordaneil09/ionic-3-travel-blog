import { NgModule } from '@angular/core';
import { TermTaxonomyDisplayPipe } from './term-taxonomy-display.pipe';

@NgModule({
    declarations: [TermTaxonomyDisplayPipe],
    exports: [TermTaxonomyDisplayPipe]
})

export class PipeModule {}
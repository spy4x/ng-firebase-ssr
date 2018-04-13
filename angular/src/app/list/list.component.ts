import {Component} from '@angular/core';
import {makeStateKey, Meta, Title, TransferState} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {take, map, switchMap, tap} from 'rxjs/operators';
import {Article} from '../article.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {unwrapCollectionSnapshotChanges} from '../firestore.helper';
import {of} from 'rxjs/observable/of';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  articles$ = this.activatedRoute.params.pipe(switchMap(() =>{
    const KEY = makeStateKey<Article[]>('articles');
    const fromState = this.transferState.get(KEY, null);
    console.log('fromState:', fromState);
    if (fromState) {
      return of(fromState);
    } else {
      console.log('fetching value from db');
      return this.db.collection(`articles`)
        .snapshotChanges()
        .pipe(
          // take(1),
          map(unwrapCollectionSnapshotChanges),
          tap((articles: Article[]) => {
            this.transferState.set(KEY, articles);
            console.log('transferState.set', articles);
          }),
        );
    }
  }));

  constructor(private transferState: TransferState,
              private db: AngularFirestore,
              private activatedRoute: ActivatedRoute,
              private seo: Meta,
              private title: Title) {
    this.title.setTitle(`@spy4x Blog - Articles`);
    this.seo.addTags([
      {name: 'author', content: 'Anton Shubin'},
      {name: 'keywords', content: 'angular,universal,ssr,firebase,spy4x'},
      {
        name: 'description',
        content: 'Angular Server-side rendering app running on Firebase Hosting'
      },

      // Twitter card
      {
        name: 'twitter:card',
        content: '@spy4x Blog - Articles'
      },
      {
        name: 'twitter:site',
        content: 'https://sp-ng-blog.firebaseapp.com'
      },
      {
        name: 'twitter:title',
        content: 'Angular SSR App by @spy4x'
      },
      {
        name: 'twitter:description',
        content: 'Angular Server-side rendering app running on Firebase Hosting'
      },
      {
        name: 'twitter:creator',
        content: '@spy4x'
      },
      {
        name: 'twitter:image',
        content: 'https://avatars3.githubusercontent.com/u/4995814?s=300'
      },

      // Open Graph
      {
        property: 'og:title',
        content: '@spy4x Blog - Articles'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://sp-ng-blog.firebaseapp.com'
      },
      {
        property: 'og:image',
        content: 'https://avatars3.githubusercontent.com/u/4995814?s=300'
      },
      {
        property: 'og:image:alt',
        content: 'Anton Shubin avatar'
      },
      {
        property: 'og:description',
        content: '@spy4x blog about technologies and stuff'
      },
      {
        property: 'og:site_name',
        content: '@spy4x Blog'
      },
    ]);
  }

}
